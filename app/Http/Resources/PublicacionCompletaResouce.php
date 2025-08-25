<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicacionCompletaResouce extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return  [
            'id' => $this->id,
            'titulo' => $this->titulo,
            'precio' => $this->precio,
            'stock' => $this->stock,
            'descripcion' => $this->descripcion,
            'cantidad_vendida' => $this->cantidad_vendida,
            'deleted' => $this->deleted,
            'paused' => $this->paused,
            'imagenes'=> ImagenesResource::collection($this->imagenes),
            'producto'=> $this->productos->count() === 1 
        ? new ProductosResource($this->productos->first())
        : ProductosResource::collection($this->whenLoaded('productos')),
        ];

    }
}
