<?php

namespace App\Http\Controllers;

use App\Http\Resources\PublicacionResource;
use App\Models\Publicacion;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Crypt;

class PublicacionesController extends Controller
{
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
                    $query->orWhere('id', $searchData);
                  
                    
                })
                ->orderBy($column, $direction)
                ->get();
            
                if ($rawProducts->isNotEmpty()) {
                    $productsArray = PublicacionResource::collection($rawProducts)->resolve();
                    $encrypted = Crypt::encrypt($productsArray); //  Guarda el valor cifrado
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
                $products = Crypt::decrypt($products); //  Ahora descifro correctamente
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
}