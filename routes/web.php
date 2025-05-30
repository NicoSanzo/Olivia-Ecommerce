<?php

use App\Auth\AuthSession;
use App\Http\Controllers\PerfilUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Tymon\JWTAuth\Facades\JWTAuth;

Route::get('/{any}', function () {


 
    return view('app');  // Blade que contiene <div id="root">
})->where('any', '.*');



?>