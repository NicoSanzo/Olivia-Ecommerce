<?php

namespace App\Http\Controllers;
use App\Models\Marca;
use Illuminate\Database\QueryException;


class MarcaController extends Controller
{
    public function listarMarcas()
    {
        try {
            // Consulta todas las marcas desde la base de datos
            $Marcas = Marca::all();

            if ($Marcas->isEmpty()) {
                return response()->json(['message' => 'No se encontraron marcas'], 404);
            }

        } catch (QueryException $e) {
            // Manejo de errores en caso de fallo en la consulta
            return response()->json(['message' => 'Error al obtener las marcas', 'error' => $e->getMessage()], 500);
        }
    

        return response()->json(['status' => 'success', 'marcas' => $Marcas]);
    }
}
