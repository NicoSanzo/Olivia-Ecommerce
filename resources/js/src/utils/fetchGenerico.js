export const fetchGenerico = async (url, method, body = null) => {
  const options = {
    method,
    credentials: 'include',
  };

  // Si es FormData -> NO ponemos Content-Type
  if (body instanceof FormData) {
    options.body = body;
    options.headers = {
      Accept: 'application/json',
    };
  } else if (body) {
    // Si es objeto normal -> lo mandamos como JSON
    options.body = JSON.stringify(body);
    options.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  } else {
    options.headers = {
      Accept: 'application/json',
    };
  }

  let res = await fetch(url, options);

  if (!res.ok) {
    let errorData = {};
    try {
      errorData = await res.json();
    } catch (e) {}

    const tokenExpirado =
      res.status === 403 && errorData?.error === 'Token expirado';

    if (tokenExpirado) {
      const refreshResponse = await fetch('/api/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshResponse.ok) {
        res = await fetch(url, options);

        if (!res.ok) {
          let finalError = {};
          try {
            finalError = await res.json();
          } catch (e) {}
          throw new Error(finalError.message || 'Error en la solicitud');
        }

        return res.json();
      } else {
        throw new Error('Sesión expirada, vuelva a iniciar sesión');
      }
    }

    if (errorData.message && typeof errorData.message === 'string') {
      throw new Error(errorData.message);
    } else if (errorData.message && typeof errorData.message === 'object') {
      throw errorData;
    } else {
      throw new Error('Error en la solicitud');
    }
  }

  return res.json();
};