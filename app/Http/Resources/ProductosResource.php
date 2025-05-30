<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductosResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'codigo' => $this->codigo,
            'modelo' => $this->modelo,
            'color' => $this->color,
            'alto' => $this->alto,
            'ancho' => $this->ancho,
            'profundidad' => $this->profundidad,
            'peso' => $this->peso,
            'marca'=>new MarcaResource($this->whenLoaded('marca')),
            'categoria'=>new MarcaResource($this->whenLoaded('categoria'))
        ];
    }
}
