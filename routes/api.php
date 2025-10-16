<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ClientRegisterController;
use App\Http\Controllers\DetallePublicacionController;
use App\Http\Controllers\FormularioContactoController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\MercadopagoController;
use App\Http\Controllers\MercadopagoWebhookController;
use App\Http\Controllers\PerfilClientController;
use App\Http\Controllers\PerfilUserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PublicacionesController;
use App\Http\Controllers\TransferenciaController;

// Rutas de la API
Route::post('/publicacion', [PublicacionesController::class, 'publicaciones']);
Route::post('/detalle', [DetallePublicacionController::class, 'detallePublicacion']);
Route::post ('/contacto',[FormularioContactoController::class , 'EnviarMensaje']);
Route::post('/registrarCliente',[ClientRegisterController::class,'ClientRegister']);

// Rutas protegidas por JWT y roles
Route::post('/login', [AuthController::class, 'login']);
Route::post('/refresh', [AuthController::class, 'refresh']); 

// Ruta protegida para obtener el perfil del usuario
Route::middleware(['auth'])->group(function () {
    Route::post('/perfil', [PerfilUserController::class,'getUserPerfil']);
    Route::post('/Logout', [AuthController::class, 'logout']);
});

// Rutas protegidas por roles (admin)
Route::middleware(['auth', 'role:Administrador'])->group(function () {
    Route::post('/listaPublicaciones', [PublicacionesController::class, 'listadoPublicaciones']);
    Route::post('/PublicationHandle/{id}/{accion}', [PublicacionesController::class, 'manejarPublicacion']);
    Route::post('/marcas', [MarcaController::class, 'listarMarcas']);
    Route::post('/categorias', [CategoriaController::class, 'listarCategorias']);
    Route::post('/modificarPublicacion', [PublicacionesController::class, 'modificarPublicaciones']);
});


// Rutas protegidas por roles (cliente)
Route::middleware(['auth', 'role:Cliente'])->group(function () {
    Route::post('/cards_process_payment', [MercadopagoController::class, 'cardsProcessPayment']);
    Route::post('/process_payment', [MercadopagoController::class, 'processPayment']);
    Route::post('/getDataFiscal',[PerfilClientController::class,'getFiscalData']);
    Route::post('/OperacionStatusMP',[MercadopagoController::class,'PaymentStatus']);
    Route::post('/transferProcessPayment',[TransferenciaController::class,'handleTransferencia']);
    //return response()->json(['message' => 'Solo clientes pueden ver esta ruta']);
});


 Route::post('/mercadopago/webhook',[MercadopagoWebhookController::class,'handle']);
 



   //Route::get('/prueba', [pruebaController::class, 'pruebaAPI']);
?>