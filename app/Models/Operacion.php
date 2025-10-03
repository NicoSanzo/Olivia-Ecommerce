<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Operacion extends Model
{


    protected $table= 'operacion';
    protected $primaryKey='id';
   

    public function Op_detail() : HasMany
    {
        return  $this->hasMany(Det_oper::class,'operacion_id');
    }

}
