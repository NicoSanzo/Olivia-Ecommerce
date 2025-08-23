<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Publicacion extends Model
{
    // Especifica el nombre de la tabla y la clave primaria
    
    protected $table = 'publicaciones';  // Tabla en la base de datos
    protected $primaryKey = 'id';       // Clave primaria de la tabla
    public $timestamps = false;         // Desactiva las marcas de tiempo automáticas
  



     // Relación muchos a muchos con el modelo Producto.
     // La publicación puede estar relacionada con múltiples productos a través de la tabla intermedia 'produ_publi'.
     
    public function productos(){

        return $this->belongsToMany(
            Producto::class,  // Modelo relacionado
            'produ_publi',    // Tabla intermedia
            'publicacion_id', // Clave foránea en 'produ_publi' para la publicación
            'producto_codigo' // Clave foránea en 'produ_publi' para el producto
        );
    }
 
     //Relación uno a muchos con el modelo Imagen.
     // Una publicación puede tener múltiples imágenes asociadas.
     
    public function imagenes(){
        return $this->hasMany(Imagen::class, 'id_publicacion', 'id');
    }

     // Relación uno a muchos con el modelo Imagen, filtrando solo la imagen principal.
     // Obtiene la imagen principal (index_imagen = 0) asociada a la publicación.
     
    public function imagen(){
        return $this->hasMany(Imagen::class, 'id_publicacion', 'id')            
                    ->where('index_imagen', 0); // Imagen principal
    }
}