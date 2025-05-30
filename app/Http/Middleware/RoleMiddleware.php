<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class RoleMiddleware
{
     public function handle(Request $request, Closure $next, ...$roles)
    {
        // Obtener el usuario autenticado usando el token JWT
        $user = JWTAuth::parseToken()->authenticate();

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        // Verificar si el rol del usuario es uno de los roles permitidos
        if (!in_array($user->TIPO_USUARIO, $roles)) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        return $next($request);
    }
}