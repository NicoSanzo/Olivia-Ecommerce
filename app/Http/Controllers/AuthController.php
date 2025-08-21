<?php

namespace App\Http\Controllers;
use App\Models\RefreshToken;
use App\Models\User;
use App\Services\RefreshTokenServices;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    protected $refreshTokenService;

    public function __construct(RefreshTokenServices $refreshTokenService)
    {
        $this->refreshTokenService = $refreshTokenService;
    }


    public function login(Request $request)
    {

        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'

        ]);

        $credentials = $request->only('username', 'password');

        // Buscar al usuario por su username
        $usuario = User::where('username', $credentials['username'])->first();

        // Verificar si existe y si la contraseña coincide
        if (!$usuario || !Hash::check($credentials['password'], $usuario->contrasena)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email o contraseña incorrecta'
            ], 401);
            
        }

        // Generar token JWT
        $token = JWTAuth::fromUser($usuario);
        
        // Genera un refresh Token y lo guarda en la BBDD
        $refreshToken=$this->refreshTokenService->createRefreshTokens($usuario->id);

        //COOKIE CONFIG// 
        
         $name ='token';
         $value = $token;
         $ttl =  config('jwt.ttl') + 5;// duracion de la cookie donde se encuentra el token:Token en minutos // consfigurado en config/jwt.php => y establecido el valor en variables de entorno .env // esta parseado porque lo requiere la cookie
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
            'refreshToken'=> $refreshToken,
        ])
        ->cookie($name, $value, $ttl, $path, $domain, $secure, $httpOnly,$raw,$sameSite) //// Generar token JWT// la cookie dura 5 min mas que el token para que pueda leerse al momento de hacer refresh
        ->cookie('refreshToken', $refreshToken, config('refresh_ttl'), $path, $domain, $secure, $httpOnly,$raw,$sameSite);  // Generar refreshtoken en otra cookie
    }


        public function refresh(Request $request)
        {
            // Obtener el refreshToken desde la cookie
            $refreshToken = $request->cookie('refreshToken');       

            if (!$refreshToken) {
                return response()->json(['message' => 'Refresh token no proporcionado'], 401);
            }       

            // Buscar el refreshtoken en la base de datos
            $tokenRecord = RefreshToken::where('TOKEN', $refreshToken)
                ->where('EXPIRES_AT', '>', now())
                ->first();      

            if (!$tokenRecord) {
                return response()->json(['message' => 'Refresh token inválido o expirado'], 401);
                RefreshToken::where('TOKEN', $refreshToken)->delete();
            }     
            
            $user = User::find($tokenRecord->usuario_id);
            $newAccessToken = JWTAuth::fromUser($user);     
            $ttl =  config('jwt.ttl') + 5; 

            return response()->json([
                'access_token' => $newAccessToken,
                'token_type' => 'Bearer',
                'expires_in' => config('jwt.ttl') * 60,
            ])->cookie('token', $newAccessToken, $ttl , '/', null, true, true, false, 'Strict');
        }



    public function logout(Request $request)
    {
         $accessToken = $request->cookie('token');
         $refreshToken = $request->cookie('refreshToken');

         // 1. Invalidar access token (JWT)
         if ($accessToken) {
             try {
                 JWTAuth::setToken($accessToken)->invalidate();
             } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
                 // El token puede estar ya inválido o expirado
             }
         }

         // 2. Eliminar refresh token de la base de datos
         if ($refreshToken) {
             RefreshToken::where('TOKEN', $refreshToken)->delete();
         }

         // 3. Devolver respuesta y eliminar cookies
         return response()->json([
             'status' => 'success',
             'message' => 'Sesión cerrada correctamente',
         ])->cookie(Cookie::forget('token'))
           ->cookie(Cookie::forget('refreshToken'));
    }


}