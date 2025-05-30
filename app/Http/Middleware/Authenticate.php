<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;

class Authenticate
{
   public function handle(Request $request, Closure $next)
    {
        try {
            // Obtener el token desde las cookies
            $token = $request->cookie('token');

            if ($token) {
                // Si el token está presente, establece el token manualmente en JWTAuth
                JWTAuth::setToken($token);
            }

            // Intenta autenticar al usuario
        $user = JWTAuth::parseToken()->authenticate();  

        } catch (Exception $e) {
            // Manejo de errores de token
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return response()->json(['error' => 'Token inválido'],401);
            } elseif ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                return response()->json(['error' => 'Token expirado'],403);
            } else {
                return response()->json(['error' => 'Token no encontrado'],400);
            }
        }   

        // Usuario autenticado correctamente
            return $next($request);
    }
}