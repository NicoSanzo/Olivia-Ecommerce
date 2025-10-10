<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Operacion extends Model
{

    protected $table= 'operacion';
    protected $primaryKey='id';
    protected $hidden = ['cliente_id'];
  
    public function detalle_operacion() : HasMany
    {
        return  $this->hasMany(Det_oper::class,'operacion_id');
    }
    

/** Relación con el modelo User a través del modelo Cliente.
 *
 * Laravel agrega automáticamente el atributo `laravel_through_key`
 * para identificar internamente qué registro intermedio (cliente)
 * fue utilizado en la relación hasOneThrough().
 *
 * Este campo no existe en la base de datos y puede ocultarse en JSON
 * agregándolo a $hidden en el modelo User.
 */
        public function user(): HasOneThrough
    {
         return $this->hasOneThrough(
            User::class,     // Modelo destino (usuarios)
            Cliente::class,  // Modelo intermedio (cliente)
            'id_usuario',    // 🔹 FK en cliente que apunta a usuarios.id
            'id',            // 🔹 PK en usuarios
            'cliente_id',    // 🔹 FK en operacion que apunta a cliente.id_usuario
            'id_usuario'     // 🔹 PK en cliente (es el mismo campo)
        );
    }
}
