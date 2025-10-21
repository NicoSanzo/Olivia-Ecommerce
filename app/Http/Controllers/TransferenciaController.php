<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarritoRequest;
use App\Http\Requests\OperationRequest;
use App\Mail\MailCompraMercadolibre;
use App\Models\Det_oper;
use App\Models\Operacion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class TransferenciaController extends Controller
{
    
     

     public function handleTransferencia(OperationRequest $transferenciaRequest, CarritoRequest $itemsRequest){
       
        // Obtenemos el usuario autenticado desde el FormRequest
        $user = Auth::user();
        $OperationData=$transferenciaRequest->validated();
        $itemsData=$itemsRequest->validated();
        
       
        DB::transaction(function () use ($OperationData, $itemsData, $user) {
            
            $transferencia = new Operacion();
            $transferencia->cliente_id  = $user->id;
            $transferencia->subtotal    = $OperationData['subtotal'];
            $transferencia->total       = $OperationData['total'];
            $transferencia->metodo_pago = 'Transferencia';
            $transferencia->tipo_pago   = 'bank_transfer';
            $transferencia->estado_compra = 'Pendiente';
            $transferencia->forma_envio = !empty($OperationData['Envio']) ? 'Envio' : 'Acordar la entrega';
            $transferencia->monto_envio = $OperationData['Envio'] ?? null;
            $transferencia->fecha_pago_aprobado = null;
            $transferencia->estado_pago = 'pending';
            $transferencia->detalle_estado_pago = 'Pago pendiente, en espera del comprobante de pago';
            $transferencia->descuento_total = $OperationData['porcentajeDescuento'];
            $transferencia->email_pago = $user->mail;
            $transferencia->save();

            foreach ($itemsData['arrayProductsCarrito'] as $item) {
                $newItem = new Det_oper();
                $newItem->operacion_id = $transferencia->id;
                $newItem->precio_unitario = $item['precio'];
                $newItem->descuento_aplicado = 0;
                $newItem->publicacion_id = $item['itemKey'];
                $newItem->cantidad = $item['cantidadSeleccionada'];
                $newItem->titulo_publicacion = $item['titulo'];
                $newItem->imagen_publicacion = $item['imagen'];
                $newItem->save();
            }

            
        }
    );

   

        return response()->json(['status' => 'success']);

   
    }


}
