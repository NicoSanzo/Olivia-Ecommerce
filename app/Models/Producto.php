<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    // Especifica el nombre de la tabla y la clave primaria
    
    protected $table = 'productos';    // Tabla en la base de datos
    protected $primaryKey = 'codigo';  // Clave primaria de la tabla
    public $timestamps = false;       // Desactiva las marcas de tiempo automáticas

    protected $fillable = [
        'color',
        'alto',
        'ancho',
        'profundidad',
        'peso',
        'marca_id',
        'categoria_id'
    ];

    // Relación muchos a muchos con el modelo Publicacion.
    // El producto puede estar relacionado con múltiples publicaciones a través de la tabla intermedia 'produ_publi'.
    
    public function publicaciones(){
        return $this->belongsToMany(
            Publicacion::class,   // Modelo relacionado
            'produ_publi',        // Tabla intermedia
            'producto_codigo',    // Clave foránea en 'produ_publi' para el producto
            'publicacion_id'      // Clave foránea en 'produ_publi' para la publicación
        );
    }

    // Relación muchos a uno con el modelo Marca.
    // Cada producto pertenece a una única marca.
    
    public function marca(){
        return $this->belongsTo(Marca::class, 'marca_id');
    }

    // Relación muchos a uno con el modelo Categoria.
    // Cada producto pertenece a una única categoría.
    
    public function categoria(){
        return $this->belongsTo(Categoria::class, 'categoria_id');
    }

    
}