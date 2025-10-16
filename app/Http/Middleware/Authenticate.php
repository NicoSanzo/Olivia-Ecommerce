<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

// Excepciones específicas del paquete JWT
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

// Excepción genérica para errores de autenticación HTTP
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class Authenticate
{
    /**
     * Middleware que valida si el usuario está autenticado mediante JWT.
     * 
     * Si el token es válido, permite continuar la solicitud.
     * Si el token está ausente, vencido o es inválido, lanza una excepción
     * que será manejada por el bloque withExceptions() en bootstrap/app.php.
     */
    public function handle(Request $request, Closure $next)
    {
        // 1. Buscar el token JWT en la cookie "token"
        $token = $request->cookie('token');

        // 2. Si no hay token, lanzar una excepción de tipo JWTException
        if (!$token) {
            throw new JWTException('Token no encontrado');
        }

        try {
            // 3. Establecer el token actual en el sistema JWT
            JWTAuth::setToken($token);

            // 4. Validar el token y obtener el usuario autenticado
            $user = JWTAuth::authenticate();


        } catch (TokenExpiredException $e) {
            // 6. Si el token expiró, lanzar excepción correspondiente
            throw new TokenExpiredException('Token expirado');
        } catch (TokenInvalidException $e) {
            // 7. Si el token es inválido o fue manipulado, lanzar excepción correspondiente
            throw new TokenInvalidException('Token inválido');
        } catch (\Exception $e) {
            // 8. Cualquier otro error relacionado con el token
            throw new UnauthorizedHttpException('jwt-auth', 'Error en token: ' . $e->getMessage());
        }

        // 9. Si todo está correcto, continuar con la solicitud
        return $next($request);
    }
}