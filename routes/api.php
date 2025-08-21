<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientRegisterController;
use App\Http\Controllers\DetallePublicacionController;
use App\Http\Controllers\FormularioContactoController;
use App\Http\Controllers\PerfilUserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PublicacionesController;


// Rutas de la API
Route::post('/publicacion', [PublicacionesController::class, 'publicaciones']);
Route::post('/detalle', [DetallePublicacionController::class, 'detallePublicacion']);
Route::post ('/contacto',[FormularioContactoController::class , 'EnviarMensaje']);

Route::post('/registrarCliente',[ClientRegisterController::class,'ClientRegister']);

// Rutas protegidas por JWT y roles
Route::post('/login', [AuthController::class, 'login']);
Route::post('/refresh', [AuthController::class, 'refresh']); 

// Ruta protegida para obtener el perfil del usuario
Route::middleware(['auth'])->post('/perfil', [PerfilUserController::class,'getUserPerfil']);
Route::middleware(['auth'])->post('/Logout', [AuthController::class, 'logout']);

// Rutas protegidas por roles (admin)
Route::middleware(['auth', 'role:administrador'])->get('/admin', function () {
    return response()->json(['message' => 'Solo admin tiene acceso a esta ruta']);
});

// Rutas protegidas por roles (cliente)
Route::middleware(['auth', 'role:cliente'])->get('/cliente', function () {
    return response()->json(['message' => 'Solo clientes pueden ver esta ruta']);
});



?>