<?php

namespace App\Services;

use App\Models\RefreshToken;
use Illuminate\Support\Str;

class RefreshTokenServices{

    public function createRefreshTokens($userId)
    {

        $token= hash('sha256',Str::random(80));
        $expires_at= now()->addDays(7);
  
        RefreshToken::create([

            'USUARIO_ID'=>$userId,
            'TOKEN'=> $token,
            'EXPIRES_AT'=> $expires_at
        ]);

        return $token;

    }



}
