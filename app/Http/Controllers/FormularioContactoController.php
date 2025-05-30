<?php

namespace App\Http\Controllers;

use App\Mail\ContactoCliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class FormularioContactoController extends Controller
{
    
    public function EnviarMensaje(Request $request){
       
       
        $data= $request->validate([    

           'nombre' => 'required|string',
           'email' =>'required|string',
           'apellido' =>'required|string',
           'mensaje' =>'required|string',  

        ]); 

        $Address = config('mail.from.address');

        //Mail::to($Address)->send(new ContactoCliente($data));

        return response()->json(['success'=> true,
                                 'mensaje' => '¡Correo enviado! Gracias por el contacto.']);

    }


}