<?php 

namespace App\Http\Controllers;

use App\Http\Resources\PublicacionCompletaResouce;
use App\Models\Publicacion;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Cache;  // Para almacenamiento en caché
use Illuminate\Support\Facades\Crypt;  // Para cifrar/descifrar datos

class DetallePublicacionController extends Controller
{

    public function detallePublicacion(Request $request)
    {
        try {
            
            $request->validate([
                'itemKey' => 'required',
            ]);

            $itemKey = $request->input('itemKey');
            $cacheKey = "publicacion_{$itemKey}";

            $detail = Cache::get($cacheKey);

            if (!$detail) {
                $detail = Publicacion::with([
                    'productos',
                    'productos.marca',
                    'productos.categoria',
                    'imagenes',
                ])->find($itemKey);

                if ($detail) {
                    $encryptedDetail = Crypt::encrypt($detail);
                    Cache::put($cacheKey, $encryptedDetail, now()->addMinutes(10));
                }
            } else {

                $detail = Crypt::decrypt($detail);
            }

            return response()->json([
                'status' => 'success',
                'publicacion' => new PublicacionCompletaResouce($detail)
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



?>