<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $table= 'usuario';
    protected $primaryKey= 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nombre',
        'mail',
        'contrasena',
        'tipo_usuario',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */

    protected $hidden = [
        'contrasena',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */

     public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    ///Este método retorna un array de "claims" personalizados, es decir, datos adicionales que vos quieras meter dentro del token JWT. 
    //Este método sirve para agregar datos extra al token JWT, como el role, email, o cualquier otro campo que necesites recuperar desde el frontend.

    public function getJWTCustomClaims() 
    {
        return [
            'role' =>$this->tipo_usuario,
        ];
    }

    



}
