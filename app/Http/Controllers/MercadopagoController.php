<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarritoRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\Client\Common\RequestOptions;
use MercadoPago\MercadoPagoConfig;
use Tymon\JWTAuth\Facades\JWTAuth;
use MercadoPago\Exceptions\MPApiException;

class MercadopagoController extends Controller
{

    public function cardsProcessPayment(Request $request, CarritoRequest $itemsRequest)
    {
  
        MercadoPagoConfig::setAccessToken(env('MERCADOPAGO_ACCESS_TOKEN'));

        $userId = JWTAuth::parseToken()->authenticate()->id; // utilizo el id del usuario autenticado para crear el custom header
        $items= $this->CreateItems($itemsRequest); // creo el array de items a traves de la request Personalizada y utilizando la funcion de Creacion de esta misma clase, 

        $opts = new RequestOptions();
        $opts->setCustomHeaders([
            'x-idempotency-key' => "user_{$userId}_" . uniqid('', true),
        ]);

        $payload = [
            'token'              => $request->input('cardToken'), // renombrado en el front
            'issuer_id'          => $request->input('issuer_id'),
            'payment_method_id'  => $request->input('payment_method_id'),
            'transaction_amount' => (float) $request->input('transaction_amount'),
            'installments'       => (int) $request->input('installments'),
            'payer' => [
                'email' => $request->input('email'),
                'identification' => [
                    'type'   => $request->input('identificationType'),
                    'number' => $request->input('number'),
                ],
            ],
           
           'shipping_amount' =>(float)$request->envio ?? 0,
            'metadata' => [
                'UserId'          => $userId,
                'publicaciones' => $items,
                'descuento_total' => 0,
            ],
            'notification_url' => env('NOTIFICATION_URL'),
        ];

        try {
            $client  = new PaymentClient();
            $payment = $client->create($payload, $opts);
            //$publicaciones = json_decode(json_encode($payment->metadata->publicaciones), true);
            Log::info('Tipo de metadata: ' . gettype($payment->metadata));
           


            return response()->json([
                "paymentData" => [
                    'estado_compra'=>$payment->status,
                    'fecha_compra'=>$payment->date_created,
                    'costo_envio'=>$payment->shipping_amount,
                    'tipo_pago'=>$payment->payment_type_id,
                    'subtotal'=> $payment->transaction_amount,
                    'total'=> $payment->transaction_details->total_paid_amount,
                    'productos' => $items,
                    
                ]
            ]);
        } catch (MPApiException $e) {

            /** @var \MercadoPago\Net\MPResponse $api */
            $api = $e->getApiResponse();

            // Status HTTP
            $status = method_exists($api, 'getStatusCode') ? $api->getStatusCode() : 400;
            // Body (string). Suele venir JSON.
            $body = method_exists($api, 'getContent') ? $api->getContent() : null;
            // Si es JSON válido, lo convertimos a array para log/respuesta
            $json = null;
            if (is_string($body)) {
                $tmp = json_decode($body, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $json = $tmp;
                }
            }

            Log::error('MercadoPago API error', [
                'status'   => $status,
                'message'  => $e->getMessage(),
                'response' => $json ?? $body, // si no es JSON, loguea el texto
            ]);

            return response()->json(
                $json ?? ['error' => true, 'message' => $e->getMessage(), 'raw' => $body],
                $status
            );
        }
    }


    public function processPayment(Request $request, CarritoRequest $itemsRequest)
    { 
        MercadoPagoConfig::setAccessToken(env('MERCADOPAGO_ACCESS_TOKEN'));  

        $items = $this->CreateItems($itemsRequest);
        $client = new PreferenceClient();
         
        $preference = $client->create([
            "items" => $items,
            "payer" => [],
            "payment_methods" => [
                "excluded_payment_types" => [
                    ["id" => "ticket"]
                ]
            ],
            "shipments" => [
                "cost" => $request->Envio ?? 0,
            ],
            "metadata" => [
                "UserId" => JWTAuth::parseToken()->authenticate()->id,
                "publicaciones" => $items,
                "descuento_total" => 0
            ],
            "back_urls" => [
                 "success" => "http://localhost:8000/CompraExitosa",
                 "failure" => "http://localhost:3000/failure",
                 "pending" => "http://localhost:3000/pending",
            ],
            "notification_url" => env("NOTIFICATION_URL"),
        ]);

        return response()->json($preference);    
    }



    private function CreateItems($request) :array //funcion que construye los Items para el array de Pago de Mercadopago
    {
        $items = [];
        foreach ($request->arrayProductsCarrito as $item) {
            $items[] = [
                'id'          => $item['itemKey'],
                'title'       => $item['titulo'],
                'quantity'    => $item['cantidadSeleccionada'],
                'unit_price'  => $item['precio'],
                'picture_url' => $item['imagen'],
                'applied_discount'=> 0
            ];
        }
        return $items;
    }
}
