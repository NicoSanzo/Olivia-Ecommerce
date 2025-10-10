<?php

namespace App\Http\Controllers;

use App\Models\Det_oper;
use App\Models\Operacion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MercadoPagoWebhookController extends Controller
{
    public function handle(Request $request)
    {
       
        if ($request->type !== 'payment') {
            // Si no es un pago, respondo 200 para que MP no reintente
            return response()->json(['status' => 'ignored'], 200);
        }

        $paymentId = $request->input('data.id');

        // Consultar a Mercado Pago para obtener info completa del pago (webhook)
        $response = Http::withToken(env('MERCADOPAGO_ACCESS_TOKEN'))
            ->get("https://api.mercadopago.com/v1/payments/{$paymentId}");

        if (!$response->successful()) {
            Log::warning('No se pudo obtener info de MP', ['paymentId' => $paymentId]);
            return response()->json(['status' => 'error'], 500);
        }

        $payment = $response->json(); // ← array asociativo

         //Log::info(json_encode($payment['status'],JSON_PRETTY_PRINT) );
          //Log::info(json_encode($payment,JSON_PRETTY_PRINT) );

         //return;
     
        //verifica que la operacion de Mercadopago no exista en la BBDD actualmente
        $operacion= Operacion::where('id_operacion_mp',$payment['id'])->first();

        // si existe la operación actualiza los datos, no crea un nuevo registro
        if($operacion){
             $operacion->estado_pago     = $payment['status'];
             $operacion->detalle_estado_pago = $payment['status_detail'];
             $operacion->estado_compra   = $payment['status'] === 'rejected'? 'Cancelada' : 'Pendiente de entrega';
             $operacion->fecha_actualizacion_mp      = Carbon::parse($payment['date_last_updated']);
             $operacion->fecha_pago_aprobado = !empty($payment['date_approved'])? Carbon::parse($payment['date_approved']): null;
             $operacion->save();

              Log::info('Operación actualizada desde MP', [
             'operacion_id' => $operacion->id_operacion_mp,
             'status'       => $operacion->estado_pago,
             ]);

        }else{
            #creo el objeto Operacion, a partir del modelo Operacion de la BBDD para guarda el registro del pago
            $operacion = new Operacion();
            $operacion->cliente_id      = $payment['metadata']['user_id'];
            $operacion->id_operacion_mp = $payment['id'];
            $operacion->subtotal           = $payment['transaction_amount'];
            $operacion->total           = $payment['transaction_details']['total_paid_amount'];
            $operacion->metodo_pago     = $payment['point_of_interaction']['business_info']['sub_unit'] ==='checkout_pro'? 'MercadoPago: Billetera':'Mercadopago: Tarjeta' ;
            $operacion->digitos_tarjeta_ref = $payment['card']['last_four_digits'] ?? null;
            $operacion->tipo_pago       = $payment['payment_type_id'] ?? null;
            $operacion->estado_compra   = $payment['status']==='rejected'? 'Cancelada':'Pendiente';
            $operacion->forma_envio     = !empty($payment['shipping_amount']) ? 'Envio' : 'Acordar la entrega';
            $operacion->monto_envio     = $payment['shipping_amount'] ?? null;
            $operacion->fecha_creacion_mp      = Carbon::parse($payment['date_created']);
            $operacion->fecha_actualizacion_mp      = Carbon::parse($payment['date_last_updated']);
            $operacion->fecha_pago_aprobado = !empty($payment['date_approved'])? Carbon::parse($payment['date_approved']): null;
            $operacion->estado_pago     = $payment['status'];
            $operacion->detalle_estado_pago     = $payment['status_detail'];
            $operacion->descuento_total     = $payment['metadata']['descuento_total'];
            $operacion->email_pago          = $payment['payer']['email'];
            $operacion->save();

            # crea un registro para cada publicacion/producto que se encuentra en la operacion, a través del modelo Det_oper de la BBDD crea un registro para cada item
            foreach ($payment['metadata']['publicaciones'] as $item) {
                $newitem=new Det_oper;
                $newitem->operacion_id = $operacion['id'];
                $newitem->precio_unitario = $item['unit_price'];
                $newitem->descuento_aplicado = $item['applied_discount'];
                $newitem->publicacion_id = $item['id'];
                $newitem->cantidad = $item['quantity'];
                $newitem->titulo_publicacion = $item['title'];
                $newitem->imagen_publicacion = $item['picture_url'];
                $newitem->save();
            }

            // Log opcional para auditoría
            Log::info('Pago registrado de MercadoPago', [
                'operacion_id' => $operacion->id_operacion_mp,
                'user_id'      => $payment['metadata']['user_id'],
                'status'       => $operacion->estado_pago,
            ]);

        }

        // Siempre responder 200 para que Mercado Pago no reintente
        return response()->json(['status' => 'ok'], 200);
    }
}