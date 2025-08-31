<?php

namespace App\Http\Controllers;


use App\Http\Resources\DomicilioFiscalResource;
use App\Models\Cliente;
use Tymon\JWTAuth\Facades\JWTAuth;

class PerfilClientController extends Controller
{
    public function getFiscalData(){


        $user= JWTAuth::parseToken()->authenticate();

       
        if(!$user){

            return response()->json([
                'status'=> "error",
                'mensaje'=>'Usuario no autorizado'
            ],401);

        }

         $cliente = Cliente::where('id_usuario', $user->id)
            ->with('domicilioFiscal')
            ->first();

          log:info($cliente);


           if (!$cliente) {
            return response()->json([
                'status'=> "error",
                'mensaje'=> 'Cliente no encontrado'
            ], 404);
        }

         return response()->json([
                'status'=> "success",
                'fiscal_data'=> new DomicilioFiscalResource($cliente->domicilioFiscal) ,
                'cliente_data'=> ['nombre'=>$user->nombre,
                                    'apellido'=>$user->apellido,
                                    'dni'=>$cliente->dni
                                    ]
            ]);
        

        



    }
}
