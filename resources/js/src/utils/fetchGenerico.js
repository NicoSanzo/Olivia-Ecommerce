export const fetchGenerico = async (url, method = 'GET', body = null) => {
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', 
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  // Primer intento de fetch
  let res = await fetch(url, options);

  // Si falla por token expirado (403 o 401 con mensaje), intentamos refresh
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    const tokenExpirado = res.status === 403 && errorData?.error === 'Token expirado';

    if (tokenExpirado) {
      // Intentar refresh
      const refreshResponse = await fetch('/api/refresh', {
        method: 'POST',
        credentials: 'include', // para enviar cookies también
      });

      if (refreshResponse.ok) {
        // Reintentar la petición original
        res = await fetch(url, options);
      } else {
        // Si el refresh también falla, forzar logout u otra acción
        throw new Error('Sesión expirada, vuelva a iniciar sesión');
      }
    }

    // Si aún no es ok después del refresh, tirar error
    if (!res.ok) {
      const finalError = await res.json().catch(() => ({}));
      throw new Error(finalError.message || 'Error en la solicitud');
    }
  }

  return res.json();
};