<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imagen extends Model
{
    // Especifica el nombre de la tabla y la clave primaria
    
    protected $table = 'PUBLI_IMAGES';  // Tabla en la base de datos
    protected $primaryKey = 'ID';       // Clave primaria de la tabla
   

    // Relación muchos a uno con el modelo Publicacion.
    // Cada imagen pertenece a una única publicación.
    
    public function publicacion(){
        return $this->belongsTo(Publicacion::class, 'id_publicacion', 'id');
    }
}