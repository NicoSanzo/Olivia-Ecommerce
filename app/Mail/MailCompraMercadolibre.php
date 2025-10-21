<?php

namespace App\Mail;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

class MailCompraMercadolibre extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
     private $data;
     private $nombreUsuario;

    public function __construct($payment,$nombreUsuario)
    {
        $this->data=$payment;
        $this->nombreUsuario=$nombreUsuario ;
        
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Mail Compra Mercadolibre',
            replyTo: 'sanzo170@outlook.com',
        );
    }

    /** 
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mailCompraMercadolibre',
            with:[
                  'data' => [
                        'items'=> $this->data['metadata']['publicaciones'],
                        'fecha compra'=> Carbon::parse($this->data['date_created']),
                        'estado'=> $this->data['status']=== 'approved' ? 'Aprobado' :
                        ($this->data['status'] === 'in_process' ? 'En proceso' :
                        ($this->data['status']=== 'rejected' ? 'Rechazado' : null)),   
                        'metodo de pago'=>$this->data['point_of_interaction']['business_info']['sub_unit'] ==='checkout_pro'? 'MercadoPago: Billetera':'Mercadopago: Tarjeta' ,
                        'metodo de entrega' => !empty($this->data['shipping_amount']) ? 'Envio' : 'Acordar la entrega',
                        'precio envio'=>$this->data['shipping_amount'],
                        'subtotal'=>'$ '. $this->data['transaction_amount'],   
                        'total'=>'$ '. $this->data['transaction_details']['total_paid_amount'],
                        'nombre'=>$this->nombreUsuario,
                        
                ]
            ],

        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
