<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Publicacion;
use Tymon\JWTAuth\Facades\JWTAuth;


class CarritoRequest extends FormRequest
{
    //estos Metodos Se ejecutan al invocar la clase 
    public function authorize(): bool
    {
        // Establezco que usuario puede realizar la recueste y si necesita autorizacion,
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return $user && $user->tipo_usuario === 'Cliente';
            
        } catch (\Exception $e) {
        return false;
        }
    }

    // En algunas ocasiones algun dato de la request puede venir como string, con esto la decodifico y la transformo en un array para utilizarlo
   protected function prepareForValidation()
    {
    if ($this->has('arrayProductsCarrito') && is_string($this->arrayProductsCarrito)) {
        $this->merge([
            'arrayProductsCarrito' => json_decode($this->arrayProductsCarrito, true)
        ]);
    }
    }

    //reglas de verificacion de los datos que estan en el carrito
    public function rules(): array 
    {
        
        return [
            'arrayProductsCarrito' => 'required|array|min:1',
            'arrayProductsCarrito.*.itemKey' => 'required|integer|exists:PUBLICACIONES,ID',
            'arrayProductsCarrito.*.titulo'  => 'required|string',
            'arrayProductsCarrito.*.precio'  => 'required|numeric',
            'arrayProductsCarrito.*.cantidadSeleccionada' => 'required|integer|min:1',
            'arrayProductsCarrito.*.imagen' => 'required|string'
        ];
    }


/**
 * Validación extra después de las reglas principales.
 * Recorre los productos del carrito y consulta el stock en la BD.
 * Si la cantidad solicitada supera el stock disponible,
 * agrega un error específico al campo correspondiente, ya que guarda el indice del del producto que se encuentra en el array y pudo fallar.
 */
    public function withValidator($validator)
    {
        // validación extra: stock
        $validator->after(function ($v) {
            foreach ($this->input('arrayProductsCarrito', []) as $i => $item) {
                $stock = Publicacion::where('ID', $item['itemKey'])->value('STOCK');
                if ($stock !== null && $item['cantidadSeleccionada'] > $stock) {
                    $v->errors()->add(
                        "arrayProductsCarrito.$i.cantidadSeleccionada",
                        "La cantidad ({$item['cantidadSeleccionada']}) supera el stock disponible ({$stock})."
                    );
                }
            }
        });
    }
}