<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RefreshToken extends Model
{
    
    public $timestamps = false;

    protected $primaryKey = 'id';
    protected $table= 'refresh_tokens';


      protected $fillable = [
        'USUARIO_ID',
        'TOKEN',
        'EXPIRES_AT',
    ];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class,'USUARIO_ID','ID');
    }


}
