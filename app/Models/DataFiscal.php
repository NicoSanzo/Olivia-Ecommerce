<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DataFiscal extends Model
{
    
    
    protected $table= "dom_fis" ;
    protected $primaryKey= "dom_fis_id";
    public $timestamps=false;



       public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id', 'id_usuario');
    }

}
