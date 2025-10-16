<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use App\Http\Middleware\Authenticate;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        api: __DIR__.'/../routes/api.php'
    )
    ->withMiddleware(function ($middleware) {
        $middleware->alias([
            'auth' => Authenticate::class,  // Middleware para autenticar usuarios
            'role' => RoleMiddleware::class, // Middleware para verificar roles
        ]);

        
    })


    //MANEJADORE DE ERRORES GLOBALES PARA TODOS LOS CASOS
    
->withExceptions(function (Exceptions $exceptions) {

        // 1. Validación fallida (422)
        $exceptions->render(function (ValidationException $e, $request) {
            return response()->json([
                'success' => false,
                'type' => 'ValidationException',
                'message' => 'Los datos enviados no son válidos.',
                'errors' => $e->errors(),
            ], 422);
        });

        // 2. Modelo no encontrado (404)
        $exceptions->render(function (ModelNotFoundException $e, $request) {
            return response()->json([
                'success' => false,
                'type' => 'ModelNotFoundException',
                'message' => 'Recurso no encontrado.',
            ], 404);
        });

        // 3. No autenticado (401)
        $exceptions->render(function (AuthenticationException $e, $request) {
            return response()->json([
                'success' => false,
                'type' => 'AuthenticationException',
                'message' => 'No autenticado.',
            ], 401);
        });

        // 3. No autenticado para JWT (401)
        $exceptions->render(function (TokenExpiredException $e, $request) {
            return response()->json([
                'success' => false,
                'type' => 'TokenExpiredException',
                'message' => 'El token ha expirado.',
            ], 401);
        });     

        $exceptions->render(function (TokenInvalidException $e, $request) {
            return response()->json([
                'success' => false,
                'type' => 'TokenInvalidException',
                'message' => 'El token es inválido.',
            ], 401);
        });     

        $exceptions->render(function (JWTException $e, $request) {
            return response()->json([
                'success' => false,
                'type' => 'JWTException',
                'message' => $e->getMessage() ?? 'No se encontró el token.',
            ], 401);
        });



        // 4. No autorizado (403)
        $exceptions->render(function (AuthorizationException $e, $request) {
            return response()->json([
                'success' => false,
                'type' => 'AuthorizationException',
                'message' => 'Acceso no autorizado.',
            ], 403);
        });

        // 5. Error de base de datos (500)
        $exceptions->render(function (QueryException $e, $request) {
            Log::error($e);

            return response()->json([
                'success' => false,
                'type' => 'QueryException',
                'message' => 'Error interno en la base de datos.',
                'code' => $e->getCode(),
            ], 500);
        });

        $exceptions->render(function(PDOException $e ,$request){

           return response()->json([
                'success' => false,
                'type' => 'PDOException',
                'message' => 'Error interno en la base de datos.',
                'code' => $e->getCode(),
            ], 500);

        });

        // 6. Error genérico (500)
        $exceptions->render(function (Throwable $e, $request) {
            Log::error($e);
  
            return response()->json([
                'success' => false,
                'type' => class_basename($e),
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
            ], 500);
        });

        // 7. Forzar JSON solo para rutas API
        $exceptions->shouldRenderJsonWhen(function ($request, Throwable $e) {
            return $request->is('api/*') || $request->expectsJson();
        });
    })
    ->create();
