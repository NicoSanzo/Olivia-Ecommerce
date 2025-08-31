<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ClientRegisterController extends Controller
{
    
    public function ClientRegister(Request $request)
    {


        $validator = Validator::make($request->all(),[

            'nombre'=> 'required|string|max:60',
            'apellido'=>'required|string|max:60',
            'usuario' => 'required|string|max:60|unique:USUARIO,USERNAME',
            'email'=>'required|string|max:60|unique:USUARIO,MAIL',
            'contraseña' =>'required|string|min:6',
            'dni' => 'required|digits:8|unique:CLIENTE,DNI',
            'celular' => 'required|digits_between:8,15',
                 
        ]);
        
        if($validator->fails()){
            return response()->json(['message'=>$validator->errors()],422);
        }

  


        $usuario = User::create ([

            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'username' => $request->usuario,
            'contrasena' => Hash::make($request->contraseña),
            'fecha_alta' => now(),
            'tipo_usuario' => 'Cliente',
            'mail' => $request->email,
        ]);

        $cliente = Cliente::create([

            'id_usuario' => $usuario->id,
            'dni' => $request->dni,
            'celular'=> $request->celular,

        ]);


      
            return response()->json([
                'status' => 'success',
                'message'=> 'Usuario registrado exitosamente',
            ],201);
                
            
        



    }




};
