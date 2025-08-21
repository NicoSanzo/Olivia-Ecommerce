export const fetchGenerico = async (url, method = 'POST', body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json', // 👈 Asegura que el backend responda JSON
    },
    credentials: 'include',
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  let res = await fetch(url, options);

  // Si falla, analizamos el error
  if (!res.ok) {
    let errorData = {};
    try {
      errorData = await res.json();
    } catch (e) {
      // Si no es JSON, queda vacío
    }

    const tokenExpirado = res.status === 403 && errorData?.error === 'Token expirado';

    if (tokenExpirado) {
      // Intentar refresh
      const refreshResponse = await fetch('/api/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshResponse.ok) {
        // Reintentar la petición original
        res = await fetch(url, options);

        // Repetimos el chequeo de error por si sigue fallando
        if (!res.ok) {
          let finalError = {};
          try {
            finalError = await res.json();
          } catch (e) {}
          throw new Error(finalError.message || 'Error en la solicitud');
        }

        return res.json(); // Si fue exitoso tras el refresh
      } else {
        throw new Error('Sesión expirada, vuelva a iniciar sesión');
      }
    }

    // Si no era un token expirado, lanzamos el error original
          if (errorData.message && typeof errorData.message === 'string') {
        throw new Error(errorData.message);
      } else if (errorData.message && typeof errorData.message === 'object') {
        // lanzar el objeto para manejarlo luego en onError
        throw errorData;
      } else {
        throw new Error('Error en la solicitud');
      }
  }

  return res.json(); // Todo OK
};