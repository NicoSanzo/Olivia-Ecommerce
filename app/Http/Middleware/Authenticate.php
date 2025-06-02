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

        $token = $request->cookie('token'); 

        if (!$token) {
            return response()->json(['error' => 'Token no encontrado'], 400);
        }   

        try {
            JWTAuth::setToken($token);
            $user = JWTAuth::authenticate();  
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expirado'], 403);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error en token: ' . $e->getMessage()], 400);
        }   

        return $next($request);
    }
}