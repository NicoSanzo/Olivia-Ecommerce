<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compra MercadoLibre</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f3f3; font-family: Trebuchet MS, sans-serif;">

  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:10px; box-shadow:0 0 2px #dcdcdc; margin-top:20px;margin-bottom:20px;">

<!-- Encabezado-->
<tr>
  <td style="padding:20px;">
    <table width="90%" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <!-- Logo a la izquierda -->
        <td width="90" valign="middle">
          <img src="{{ asset('images/LogoOlivia.png') }}" alt="Logo" width="90px" style="display:block; border-radius:50%;" />
        </td>
        <!-- Texto a la derecha -->
        <td align="right" valign="middle" style="font-size:14px; color:#333; font-family: Arial, sans-serif;">
          Hola, {{$data['nombre']}}
        </td>
      </tr>
    </table>
  </td>
</tr>


<!-- Estado de compra -->
@php
  switch ($data['estado']) {
      case 'Aprobado':
          $color = '#399f65';
          $titulo = 'Gracias por tu compra!';
          $mensaje = 'Tu pago fue aprobado';
          $imagen = 'success.png';
          break;

      case 'En proceso':
          $color = '#e6840bff';
          $titulo = 'Gracias por tu compra!';
          $mensaje = 'Tu pago está pendiente';
          $imagen = 'pending.png';
          break;

      case 'Rechazado':
          $color = '#d9534f';
          $titulo = 'Lo sentimos, tu compra no fue aprobada';
          $mensaje = 'Tu pago fue rechazado';
          $imagen = 'cancel.png';
          break;

      default:
          $color = '#ccc';
          $titulo = 'Estado desconocido';
          $mensaje = 'No pudimos determinar el estado de tu pago.';
          $imagen = 'info.png';
          break;
  }
@endphp

<tr>
  <td style="padding:10px 0;">
    <table width="95%" align="center" cellpadding="0" cellspacing="0" style="border-left:5px solid '{{ $color }}'; border-radius:8px; background-color:#f9f9f9; padding:15px 25px; height:110px;">
      <tr>
        <td style="vertical-align:middle;">
          <p style="font-size:18px; color:#222; margin:0 0 8px;">{{ $titulo }}</p>
          <p style="font-size:15px; font-weight:bold; color:'{{ $color }}'; margin:0;">{{ $mensaje }}</p>
        </td>
        <td align="right">
          <img src="{{ asset('images/' . $imagen) }}" alt="{{ $data['estado'] }}" width="65" style="display:block;" />
        </td>
      </tr>
    </table>
  </td>
</tr>

    <!-- Productos -->
    <tr>
      <td style="padding:20px;">
        @foreach ($data['items'] as $producto)
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px; border:1px solid #e5e5e5; border-radius:8px; background:#fafafa;">
          <tr>
            <td width="70" style="padding:10px; height:60px;">
              <img src="{{ $producto['picture_url'] }}" alt="Producto" width="60px" height="60px" style="display:block; border-radius:6px ; object-fit:contain;">
            </td>
            <td style="padding:10px; vertical-align:middle; width: 70%;">
              <p style="margin:0; font-size:14px; color:#333; font-weight:bolder;">{{ $producto['title'] }}</p>
              <p style="margin:5px 0 0; font-size:13px; color:#555;">{{ $producto['quantity'] }} u</p>
            </td>
            <td style="padding:10px; text-align:left; vertical-align:middle;">
              <p style="margin:0; font-size:14px; color:#000 ;width:max-content;">$ {{ number_format($producto['unit_price'], 2) }}</p>
            </td>
          </tr>
        </table>
        @endforeach
      </td>
    </tr>

    <!-- Resumen de pago -->
    <tr>
      <td style="padding:0 25px;">
        <hr style="border:none; border-top:1px solid #ddd; margin:15px 0;">
        <table width="100%" style="font-size:14px; color:#333;">
          @foreach($data as $key => $value)
            @if($key !== "items" && $key !== "nombre" && $key !== "total" && !($key === 'precio envio' && ($value === null || $value === 0)))
            <tr>
              <td style="padding:4px 0;">{{ ucfirst($key) }}</td>
              <td align="right" style="padding:4px 0;">
                @if ($key === 'precio envio' && $value !== null)
                  $ {{ $value }}
                @else 
                  {{ $value }}
                @endif
              </td>
            </tr>
            @endif
          @endforeach
        </table>
        <hr style="border:none; border-top:1px solid #ddd; margin:15px 0;">
      </td>
    </tr>

    <!-- Total -->
    <tr>
      <td style="padding:10px 25px 25px;">
        <table width="100%">
          <tr>
            <td style="font-size:16px; font-weight:bold; color:#000;">Total</td>
            <td align="right" style="font-size:16px; font-weight:bold; color:#000;">{{ $data['total'] }}</td>
          </tr>
        </table>
      </td>
    </tr>


  </table>

</body>
</html>
