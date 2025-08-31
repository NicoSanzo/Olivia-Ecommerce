<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DomicilioFiscalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            
            'direccion' => $this-> direccion,
            'codigo_postal' => $this->codigo_postal,
            'localidad' => $this->localidad,
            'provincia' => $this->provincia,
            
        ];
    }
}
