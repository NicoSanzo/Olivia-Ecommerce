<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\Route;



  Route::get('/mail',[function () {

    $payment = [
    'metadata' => [
        'publicaciones' => [
            [
                'unit_price' => 2500.00, 
                'quantity' => 2,
                'title' => 'Camiseta deportiva Nike Camiseta deportiva Nike Camiseta dep',
                'picture_url' => 'https://media.istockphoto.com/id/1436061606/es/foto/zapatilla-de-mujer-voladora-y-colorida-aislada-sobre-fondo-blanco-zapato-deportivo-elegante-de.jpg?s=612x612&w=0&k=20&c=qlI4Cs064MYmir5RnBNfzxLOMjT7Av4NW58wLXffRY8=',
            ],
            [
                'unit_price' => 1800.00,
                'quantity' => 1,
                'title' => 'Zapatillas running Adidas',
                'picture_url' => 'https://media.istockphoto.com/id/1436061606/es/foto/zapatilla-de-mujer-voladora-y-colorida-aislada-sobre-fondo-blanco-zapato-deportivo-elegante-de.jpg?s=612x612&w=0&k=20&c=qlI4Cs064MYmir5RnBNfzxLOMjT7Av4NW58wLXffRY8=',
            ],
        ],
    ],
    'status' => 'approved',
    'shipping_amount' => 0,
    'date_created' => '2025-10-20T15:45:00Z',
    'transaction_amount' => 6600.00,
    'transaction_details'=>['total_paid_amount' => 60000],
    'point_of_interaction' => [
        'business_info' => [
            'sub_unit' => 'checkout_pro', // puedes cambiar a otro valor para probar el otro caso
        ],
    ],
];

$user = [
    'nombre' => 'Nicolas',
    'apellido'=> 'sanzo'
        
];

    $data = [
        'items'=> $payment['metadata']['publicaciones'],
        'fecha compra'=> Carbon::parse($payment['date_created']),
        'estado'=> $payment['status']=== 'approved' ? 'Aprobado' :
        ($payment['status'] === 'in_process' ? 'En proceso' :
        ($payment['status']=== 'rejected' ? 'Rechazado' : null)),   
        'metodo de pago'=>$payment['point_of_interaction']['business_info']['sub_unit'] ==='checkout_pro'? 'MercadoPago: Billetera':'Mercadopago: Tarjeta' ,
        'metodo de entrega' => !empty($payment['shipping_amount']) ? 'Envio' : 'Acordar la entrega',
        'precio envio'=>$payment['shipping_amount'],
        'subtotal'=>'$ '. $payment['transaction_amount'],   
        'total'=>'$ '. $payment['transaction_details']['total_paid_amount'],
        'nombre'=>$user['nombre'],
    ];

    return view('mailCompraMercadolibre', compact('data') );

 }]);

 Route::get('/{any}', function () {

    return view('app');  // Blade que contiene <div id="root">

})->where('any', '.*');








?>