<?php

use Illuminate\Support\Facades\Route;


Route::get('/{any}', function () {

    return view('app');  // Blade que contiene <div id="root">

})->where('any', '.*');

 








?>