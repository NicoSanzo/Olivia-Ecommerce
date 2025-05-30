<?php

namespace App\Http\Controllers;

use App\Auth\AuthSession;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class PerfilUserController extends Controller
{
    
    public function getUserPerfil()
    {

        $user= JWTAuth::parseToken()->authenticate();
        $user= new UserResource($user);
    
        return response()->json(['user'=>$user,
                            'status' => 'success'
                 ]);

    }
    
}
