<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    
    protected $primaryKey= "id_usuario";
    protected $table="cliente";
    public $timestamps=false;

   
    protected $fillable= [
        'id_usuario',
        'dni',
        'celular',
        'fecha_nacimiento',

    ];


    
    public function ClienteUser (){

        return $this->belongsTo(User::class,'id_usuario');

    }



}
