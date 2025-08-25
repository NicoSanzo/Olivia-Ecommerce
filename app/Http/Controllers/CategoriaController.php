<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Database\QueryException;


class CategoriaController extends Controller
{
    public function listarCategorias()
    {

        try {
            // Consulta todas las categorias desde la base de datos
            $categorias = Categoria::all();

            if ($categorias->isEmpty()) {
                return response()->json(['message' => 'No se encontraron categorias'], 404);
            }

        } catch (QueryException $e) {
            // Manejo de errores en caso de fallo en la consulta
            return response()->json(['message' => 'Error al obtener las categorias', 'error' => $e->getMessage()], 500);
        }
      
        return response()->json(['status' => 'success', 'categorias' => $categorias]);
    }

}
