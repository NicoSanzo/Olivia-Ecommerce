<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarritoRequest;

use App\Models\Operacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\Validator;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\Client\Common\RequestOptions;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Exceptions\MPApiException;


class MercadopagoController extends Controller
{
    protected $userID;

    public function __construct(){
        $this->userID = Auth::user()->id;
        
    }

    public function cardsProcessPayment(Request $request, CarritoRequest $itemsRequest)
    {
  
        MercadoPagoConfig::setAccessToken(env('MERCADOPAGO_ACCESS_TOKEN'));
  
        $items= $this->CreateItems($itemsRequest); // creo el array de items a traves de la request Personalizada y utilizando la funcion de Creacion de esta misma clase, 

        $opts = new RequestOptions();
        $opts->setCustomHeaders([
            'x-idempotency-key' => "user_{$this->userID}_" . uniqid('', true),
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
           'shipping_amount' =>(float)$request->envio ?? null,
            'metadata' => [
                'UserId'          => $this->userID,
                'publicaciones' => $items,
                'descuento_total' => 0,
            ],
            'notification_url' => env('NOTIFICATION_URL'),
        ];
        try {
            $client  = new PaymentClient();
            $payment = $client->create($payload, $opts);
            $queryData = [
                'estado'      => $payment->status,   
                'fecha'       => $payment->date_created,
                'payment_id'          => $payment->id,
            ];
     
            $queryString=http_build_query($queryData);

            return response()->json([
                        "responseUrl" => "/EstadoCompra?". $queryString,           
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
                "cost" => $request->Envio ?? null,
            ],
            "metadata" => [
                "UserId" => $this->userID,
                "publicaciones" => $items,
                "descuento_total" => 0
            ],
            "back_urls" => [
                 "success" => env("MERCADOPAGO_BACK_URLS"),
                 "pending" => env("MERCADOPAGO_BACK_URLS"),
                 "failure" => env("MERCADOPAGO_BACK_URLS"),
            ],
            "auto_return" => "approved",
            "notification_url" => env("NOTIFICATION_URL"),
        ]);

        return response()->json($preference);    
    }


    public function PaymentStatus(Request $request)
    {         
        $validator = Validator::make($request->all(), [
            'MPPaymentId' => 'required|string',
        ]);   

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }       

        //  Obtiene el valor validado
        $MPPaymentId = $validator->validated()['MPPaymentId'];      

        // Buscar la operación con los datos nececsarios
        $data = Operacion::with([
        'detalle_operacion:operacion_id,cantidad,imagen_publicacion,precio_unitario,titulo_publicacion',
        'user:mail' //  Agrego la relación con los campos que necesito
        ])
        ->select([
            'id',
            'descuento_total',
            'estado_pago',
            'fecha_creacion_mp',
            'tipo_pago',
            'subtotal',
            'total',
            'forma_envio',
            'monto_envio',
            'Cliente_id', // importante incluirlo para que se resuelva la relación con user()
        ])
        ->where('id_operacion_mp', $MPPaymentId)
        ->where('Cliente_id', $this->userID)
        ->first();

        
        if (!$data) {return response()->json(['message' => 'Operación no encontrada'], 404);}   
        

        return response()->json(['datosPago' => $data]);
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
