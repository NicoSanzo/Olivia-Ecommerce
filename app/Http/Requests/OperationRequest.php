<?php

namespace App\Http\Requests;

use Exception;
use Illuminate\Foundation\Http\FormRequest;
use Tymon\JWTAuth\Facades\JWTAuth;


class OperationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        try{
            $user= JWTAuth::parseToken()->authenticate();
            if($user){
                 return true;
            }
        }
        catch(\Exception $e){
            return false;
        };
        return false;
        
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        
        return [
            'porcentajeDescuento' => 'required|numeric|min:0|max:99',
            'Envio' => 'nullable|numeric|min:0|max:999999999',
            'total' => 'required|numeric|min:1|max:999999999',
            'subtotal' => 'required|numeric|min:1|max:999999999', 
        ];
    }
}
