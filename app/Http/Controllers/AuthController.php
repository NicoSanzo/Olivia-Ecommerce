<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'

        ]);

        $credentials = $request->only('username', 'password');

        // Buscar al usuario por su username
        $usuario = User::where('username', $credentials['username'])->first();

        //Log::info($usuario);

        // Verificar si existe y si la contraseña coincide
        if (!$usuario || !Hash::check($credentials['password'], $usuario->contrasena)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Credenciales no válidas'
            ], 401);
        }

        // Generar token JWT
        $token = JWTAuth::fromUser($usuario);
         

         //COOKIE CONFIG// 
         $name ='token';
         $value = $token;
         $ttl =  config('jwt.ttl');// duracion del Token en minutos // consigurado en config/jwt.php => y establecido el valor en variables de entorno .env // esta parseado porque lo requiere la cookie
         $path = '/'; // Aplica para toda la aplicación
         $domain = null; // si es null aplica para todo el dominio
         $secure = true; // utiliza  solo entornos https Https
         $httpOnly = true; // solo se envia por HTTP sin opcion de manipularse desde javascript, mas seguridad si esta en "true"
         $raw = false; //Asegura que el valor de la cookie ($jwt) no será codificado ni alterado por Laravel.
         $sameSite = 'strict'; //determina cuándo se enviará una cookie en solicitudes realizadas desde otro sitio web (cross-site) (value =>strict: solo se enviará en solicitudes hechas desde el mismo dominio que emitió la cookie )
        
         

         return response()->json([
            'status' => 'success',
            'message' => 'Inicio de sesión exitoso',
            'expires_in' => $ttl,
        ])
        ->cookie($name, $value, $ttl, $path, $domain, $secure, $httpOnly,$raw,$sameSite);  
    }


     public function logout(Request $request)
     {

       $token= request()->cookie('token');

       if($token){
          try{
              JWTAuth::setToken($token)->invalidate();
          }catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
               //Log::warning('Token ya inválido o no válido al intentar cerrar sesión.');
          }

          return response()->json([
              'status' => 'success',
              'message'=> 'sesion cerrada correctamente'
          ])->cookie(Cookie::forget('token'));
       }

     }


}