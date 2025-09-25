<?php

namespace App\Http\Controllers;

use App\Models\Publicacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;

class MercadopagoController extends Controller
{
    public function ObtenerPreferenceId(Request $request)
    {
        // Inicializar SDK de MercadoPago
        MercadoPagoConfig::setAccessToken(env('MERCADOPAGO_ACCESS_TOKEN'));

        // Validación de la estructura del carrito
        $validator = Validator::make($request->all(), [
            'arrayProductsCarrito' => 'required|array|min:1',
            'arrayProductsCarrito.*.itemKey' => 'required|integer|exists:PUBLICACIONES,ID',
            'arrayProductsCarrito.*.titulo'  => 'required|string',
            'arrayProductsCarrito.*.precio'  => 'required|numeric',
            'arrayProductsCarrito.*.cantidadSeleccionada' => 'required|integer|min:1',
            'arrayProductsCarrito.*.imagen' => 'required|string'
        ]);

        // Validación extra: cantidad vs stock real
        $validator->after(function ($v) use ($request) {
            foreach ($request->input('arrayProductsCarrito', []) as $i => $item) {
                $stock = Publicacion::where('ID', $item['itemKey'])->value('STOCK');
                if ($stock !== null && $item['cantidadSeleccionada'] > $stock) {
                    $v->errors()->add(
                        "arrayProductsCarrito.$i.cantidadSeleccionada",
                        "La cantidad ({$item['cantidadSeleccionada']}) supera el stock disponible ({$stock})."
                    );
                }
            }
        });

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Construir items para MercadoPago
        $items = [];
        foreach ($request->input('arrayProductsCarrito', []) as $item) {
            $items[] = [
                'id'          => $item['itemKey'],
                'title'       => $item['titulo'],
                'quantity'    => $item['cantidadSeleccionada'],
                'unit_price'  => $item['precio'],
                'picture_url' => $item['imagen'],
            ];
            //Log::info('Datos recibidos en MercadoPagoController:', $item['imagen']);
        }

        // Log para depuración
        

        // Crear preferencia de pago en MercadoPago
        $client = new PreferenceClient();
        $paymentData = $client->create([
            "items" => $items,
            "payer" => [
                "email" => "test_user_123456@testuser.com"
            ],
            "payment_methods" => [
                "excluded_payment_types" => [
                    ["id" => "ticket"]
                ]
        ],
        "shipments"=> [
            "cost" => $request->Envio,
        ]

        ]);

        // Devolver JSON al frontend con la preferencia
        return response()->json($paymentData);
    }
}
