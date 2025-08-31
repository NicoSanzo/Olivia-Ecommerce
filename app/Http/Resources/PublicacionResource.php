<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicacionResource extends JsonResource
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
            'deleted' => $this->deleted,
            'stock' => $this->stock,
            'paused' => $this->paused,
            'imagen'  => $this->imagenes->isNotEmpty()
        ? new ImagenesResource($this->imagenes->first())
        : null,
        ];

    }
}
