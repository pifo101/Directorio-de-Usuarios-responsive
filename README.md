# Directorio de Usuarios

**Estudiante:** Juan Luis Mogollón · **Carné:** 25423

## Cómo abrirlo

Abre esta carpeta en VS Code y ejecuta `index.html` con Live Server. Necesitas conexión a internet para obtener los usuarios de JSONPlaceholder.

## Respuestas de reflexión

1. ¿Qué pasaría en un celular sin la etiqueta `meta viewport`?
    Sin la etiqueta, el celular mostraría la página como si fuera de escritorio, haciéndola muy incómoda de usar en una pantalla pequeña.
2. ¿Por qué se usa `min-width` en las media queries?
    Porque primero diseñamos para celular y, cuando hay más espacio, adaptamos la página a tablet y PC.
3. ¿Qué hace `clamp(1.5rem, 4vw, 2.5rem)`?
    Hace que el tamaño del título sea fluido y se ajuste al ancho de la pantalla, sin bajar de 1.5rem ni subir de 2.5rem.
4. ¿Qué imprime `console.log(usuarios)` justo después de `cargarUsuarios()`? ¿Por qué?
    Imprime un arreglo vacío (`[]`), porque la petición a la API tarda y `cargarUsuarios()` todavía no termina cuando se ejecuta ese `console.log`, si acaso se dá unos segundos de espera, ya cargaría todo el JSON solicitado con la API.
5. ¿Para qué sirve `if (!res.ok)` si existe `catch`?
    Porque `fetch` no lanza un error automáticamente si el servidor responde, por ejemplo, con 404. El `if` detecta esa respuesta y lanza el error para que lo maneje `catch`.
6. ¿Qué dos datos adicionales trae cada usuario en el JSON?
    En Postman se puede ver que el JSON trae muchos más datos, como el nombre de usuario y las coordenadas de ubicación (`lat` y `lng`).
7. ¿Por qué funciona un solo listener en `lista` para botones creados después?
    Porque los clics en los botones también llegan a `lista`. El listener está en ese elemento, que ya existe, y así puede detectar botones creados después.
8. ¿Qué pasa si quitas `JSON.stringify` al guardar favoritos? Compruébalo y vuelve a ponerlo.
    Local Storage guarda el arreglo como texto, por ejemplo `1,2`, en vez de JSON (`[1,2]`). Al recargar, ya no se puede recuperar como arreglo y fallaba al usar `.includes()`; por eso volví a poner `JSON.stringify`.
9. ¿En qué se diferencia `localStorage` de una variable normal?
    `localStorage` guarda los datos en el navegador aunque se recargue o cierre la página; una variable normal se pierde al recargar.

## Retos extra realizados

- Modo oscuro según el sistema, con botón y preferencia guardada en `localStorage`.
- Botón de ubicación que muestra latitud y longitud o un mensaje si se niega el permiso.

## Capturas para la entrega

En `capturas/` están `movil.png` (375px), `tablet.png` (768px), `escritorio.png` (1280px) y `favoritos.png` (Local Storage con la clave `favoritos`).
