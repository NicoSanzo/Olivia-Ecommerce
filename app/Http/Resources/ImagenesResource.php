<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImagenesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
        'id'=>$this ->id,
        'image_url'=> $this-> image_url,
        'image_name'=>$this-> image_name,
        'index_imagen' =>$this->index_imagen
        ];
    }
}
