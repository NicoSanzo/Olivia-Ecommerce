<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\Authenticate;
use App\Http\Middleware\RoleMiddleware;

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
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
