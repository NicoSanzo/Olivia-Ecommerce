<?php

namespace App\Http\Controllers;



use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;

class MercadopagoController extends Controller
{

    function ObtenerPreferenceId(Request $request){ {

        // Inicializar SDK
             MercadoPagoConfig::setAccessToken(env('MERCADOPAGO_ACCESS_TOKEN'));

             Log::info('Datos recibidos en MercadoPagoController:', $request->all());
             return;

              $data=Validator::make($request->all(), [
                  'id' => 'required|int',
                  'title' => 'required|string',
                  'stock' => Rule::prohibitedIf($request->publicacion->stock <= 0),
                  'unit_price' => 'required|numeric',
              ]);


              if ($data->fails()) {
                  return response()->json(['errors' => $data->errors()], 422);
              }

              $data = $data->validated();

             // Crear cliente de preferencia
             $client = new PreferenceClient();

             // Crear preferencia (lo que se va a cobrar)
             $PaymenteData = $client->create([
                
                
                 "items" => [
                     [
                        "id" => $request->input("id", "1234"),
                         "title" => $request->input("title", "Mi producto"),
                         "quantity" => $request->input("quantity", 6),
                         "unit_price" => $request->input("price", 25)
                     ]
                 ],
                 "payer" => [
                     "email" =>  "test_user_123456@testuser.com"
                 ],
                 "payment_methods" => [
                     "excluded_payment_types" => [
                         [
                             "id" => "ticket"
                         ]
                     ]
                 ]
                 
             ]);

             // Devolver JSON al frontend

             return response()->json($PaymenteData);
       }

    }
}