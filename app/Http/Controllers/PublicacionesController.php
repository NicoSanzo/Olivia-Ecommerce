<?php

namespace App\Http\Controllers;

use App\Http\Resources\ListadoPublicacionesResource;
use App\Http\Resources\PublicacionResource;
use App\Models\Producto;
use App\Models\Publicacion;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Validator;

class PublicacionesController extends Controller
{
    /**
     * Obtiene publicaciones activas aplicando filtros de búsqueda, ordenamiento y cacheo.
     *
     * Parámetros esperados en el Request:
     * - searchData (string|null): Texto a buscar en título o ID.
     * - inputOrder (string|null): Orden de los resultados (Menor Precio, Mayor Precio, etc.).
     *
     * Flujo:
     * 1. Valida parámetros.
     * 2. Revisa si el resultado ya está en caché.
     * 3. Si no está en caché, consulta a la base de datos y guarda el resultado cifrado en caché.
     * 4. Devuelve las publicaciones en JSON.
     *
     * @param Request $request Objeto con parámetros de entrada.
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws ValidationException Si los parámetros no cumplen las reglas.
     * @throws QueryException Si ocurre un error en la consulta SQL.
     * @throws \Exception Para cualquier otro error inesperado.
     */
    public function publicaciones(Request $request)
    {
        try {
            $request->validate([
                'searchData' => 'string|nullable',
                'inputOrder' => 'string|nullable'
            ]);

            $searchData = $request->input('searchData', '');
            $inputOrder = $request->input('inputOrder', 'Todos');

            $orderMap = [
                'Menor Precio' => ['precio', 'asc'],
                'Mayor Precio' => ['precio', 'desc'],
                'Nombre: de A a Z' => ['titulo', 'asc'],
                'Nombre: de Z a A' => ['titulo', 'desc'],
                'Todos' => ['titulo', 'asc']
            ];

            [$column, $direction] = $orderMap[$inputOrder] ?? ['titulo', 'asc'];

            $cacheKey = "publicaciones_{$searchData}_{$inputOrder}";

            // Intenta obtener los datos procesados (ya transformados) desde la caché
            $products = Cache::get($cacheKey);

            // Si no existe en caché, se consulta y se transforma
            if (!$products) {
                $rawProducts = Publicacion::with('imagen')
                    ->where('deleted', 0)
                    ->where('paused', 0)
                    ->where(function ($query) use ($searchData) {
                        $query->where('titulo', 'LIKE', '%' . $searchData . '%');
                        if (is_numeric($searchData)) {
                            $query->orWhere('id', $searchData);
                        }
                    })
                    ->orderBy($column, $direction)
                    ->get();
            
                if ($rawProducts->isNotEmpty()) {
                    $productsArray = PublicacionResource::collection($rawProducts)->resolve();
                    $encrypted = Crypt::encrypt($productsArray); // Guarda el valor cifrado
                    Cache::put($cacheKey, $encrypted, now()->addMinutes(10));
                    $products = $productsArray; // Para no descifrar de inmediato
                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'No se encontraron publicaciones.',
                        'searchData' => $searchData,
                        'inputOrder' => $inputOrder
                    ]);
                }
            } else {
                $products = Crypt::decrypt($products); // Descifra si viene de caché
            }

            // Respuesta con datos transformados desde caché
            return response()->json([
                'status' => 'success',
                'publicaciones' => $products,
                'searchData' => $searchData,
                'inputOrder' => $inputOrder
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error de validación.',
                'errors' => $e->errors()
            ], 422);
        } catch (QueryException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error en la consulta a la base de datos.',
                'error' => $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ocurrió un error inesperado.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Devuelve un listado general de publicaciones no eliminadas.
     *
     * Flujo:
     * 1. Consulta todas las publicaciones donde deleted = 0.
     * 2. Si no hay resultados, devuelve error 404.
     * 3. Si hay resultados, devuelve listado transformado con ListadoPublicacionesResource.
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * Respuestas posibles:
     * - 200: Listado de publicaciones exitoso.
     * - 404: No se encontraron publicaciones.
     */
    public function listadoPublicaciones()
    {
        $publicaciones = Publicacion::all()->where('deleted', 0);

        if ($publicaciones->isEmpty()) {
            return response()->json(['status' => 'error'], 404);
        }

        return response()->json([
            'status' => 'success',
            'publicaciones' => ListadoPublicacionesResource::collection($publicaciones)
        ]);
    }

    /**
     * Maneja el estado de una publicación (eliminar, pausar o activar).
     *
     * @param int $id ID de la publicación a modificar.
     * @param string $accion Acción a realizar: "delete", "pause", "activate".
     *
     * Flujo:
     * 1. Busca la publicación por ID.
     * 2. Según la acción:
     *    - delete: marca como eliminada.
     *    - pause: marca como pausada.
     *    - activate: activa (quita pausa).
     * 3. Guarda los cambios y devuelve respuesta.
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * Respuestas posibles:
     * - 200: Acción realizada con éxito.
     * - 400: Acción no válida.
     * - 404: Publicación no encontrada.
     * - 500: Error inesperado.
     *
     * @throws ModelNotFoundException Si la publicación no existe.
     * @throws \Exception
     */
    public function manejarPublicacion($id, $accion)
    {
        try {
            $publicacion = Publicacion::findOrFail($id);        

            switch ($accion) {
                case 'delete':
                    $publicacion->deleted = 1;
                    $mensaje = 'Publicación eliminada correctamente.';
                    break;      

                case 'pause':
                    $publicacion->paused = 1;
                    $mensaje = 'Publicación pausada correctamente.';
                    break;      

                case 'activate':
                    $publicacion->paused = 0;
                    $mensaje = 'Publicación activada correctamente.';
                    break;      

                default:
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Acción no válida.'
                    ], 400);
            }       

            $publicacion->save();       

            return response()->json([
                'status' => 'success',
                'message' => $mensaje
            ], 200);        

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Publicación no encontrada.'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ocurrió un error inesperado.',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    public function modificarPublicaciones(Request $request)
    {
        

 
        $validar= Validator::make($request->all(), [
            'id_publicacion'=>'required|integer|exists:publicaciones,id',  
            'codigo_producto'=>'required|integer|exists:productos,codigo',
            'titulo'=>'required|string|max:100',
            'precio'=>'required|numeric|min:0|max:9999999',
            'stock'=>'required|integer|min:0|max:999',
            'old_image_info'=>'sometimes|array',
            'new_image_info*'=>'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'new_images_index'=>'sometimes|array',
            'descripcion'=>'nullable|string|max:10000',
            'categoria_id'=>'required|integer|exists:categoria,id',
            'marca_id'=>'required|integer|exists:marca,id',
            'modelo'=>'required|string|max:25',
            'alto'=>'nullable|numeric|min:0|max:999',
            'ancho'=>'nullable|numeric|min:0|max:999.99',
            'profundidad'=>'nullable|numeric|min:0|max:999.99',
            'peso'=>'nullable|numeric|min:0|max:999.99',
            'color'=>'nullable|string|max:25',
        ]);


       


       if ($validar->fails()) {
           return response()->json([
               'status' => 'error',
               'message' => 'Validación fallida.',
               'errors' => $validar->errors()
           ], 422);
       }

       $publicacion = Publicacion::find($request->input('id_publicacion')); 

       if (!$publicacion) {
           return response()->json([
               'status' => 'error',
               'message' => 'Publicación no encontrada.'
           ], 404);
       }
    
       $publicacion->fill($request->all());
       $publicacion->save();


      $producto = Producto::find($request->input('codigo_producto'));

      if (!$producto) {
           return response()->json([
               'status' => 'error',
               'message' => 'Producto no encontrado.'
           ], 404);
       }
       $producto->fill($request->all());
       $producto->save();


       return response()->json([
           'status' => 'success',
           'message' => 'Publicación modificada correctamente.',

        ]);
        

    }


}



   