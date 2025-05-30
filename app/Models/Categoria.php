<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    // Especifica el nombre de la tabla y la clave primaria
    
    protected $table = 'CATEGORIA';  // Tabla en la base de datos
    protected $primaryKey = 'id';    // Clave primaria de la tabla
}