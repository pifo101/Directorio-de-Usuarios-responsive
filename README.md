# Directorio de Usuarios

**Estudiante:** Juan Luis Mogollón · **Carné:** 25423

## Cómo abrirlo

Abre esta carpeta en VS Code y ejecuta `index.html` con Live Server. Necesitas conexión a internet para obtener los usuarios de JSONPlaceholder.

## Guía para leer el código

1. **`index.html`:** contiene el título, el buscador, un mensaje de estado y un `<main>` vacío. Las tarjetas no están escritas aquí: las agrega JavaScript.
2. **`styles.css`:** comienza con una columna para móvil. Desde 600px hay dos columnas y desde 1024px hay tres. Prueba cambiar el ancho con las herramientas del navegador.
3. **`app.js`, secciones 1 y 2:** obtiene los elementos del HTML y pide los datos con `fetch`. Observa por qué se verifica `res.ok` y para qué sirve `catch`.
4. **Sección 3:** `mostrarUsuarios` recorre los datos y crea una tarjeta por usuario. `esFav` decide cómo se ve el botón.
5. **Secciones 4 y 5:** `aplicarFiltro` busca nombres; el evento `input` lo ejecuta mientras escribes. El evento `click` marca o quita favoritos y `localStorage` los conserva al recargar.

Para experimentar, busca parte de un nombre, marca dos favoritos y recarga. En DevTools revisa **Network** para ver la petición `users` y **Application > Local Storage** para ver la clave `favoritos`.

## Respuestas de reflexión

Escribe las respuestas con tus propias palabras después de experimentar:

1. ¿Qué pasaría en un celular sin la etiqueta `meta viewport`?
    Sin la etiqueta tendría un aspecto estático en cuanto al tamaño de pantalla, sería muy incomodo de usar en un dispositivo movil
2. ¿Por qué se usa `min-width` en las media queries?
    Porque el objetivo es que primero se adapte a un celular antes de a una pc  
3. ¿Qué hace `clamp(1.5rem, 4vw, 2.5rem)`?
    Hace que el tamaño del título sea fluido y adaptable, ajustándose automáticamente según el ancho de la pantalla
4. ¿Qué imprime `console.log(usuarios)` justo después de `cargarUsuarios()`? ¿Por qué?
    Imprimiría el json que recibe la API porque ese es el valor que se le asigna después de la función
5. ¿Para qué sirve `if (!res.ok)` si existe `catch`?
    Porque el catch verifica si llegaron los archivos, el if es una verificación si el archivo json llega en buenas condiciones
6. ¿Qué dos datos adicionales trae cada usuario en el JSON?
    Desde postman se puede identificar que cada usuario que se consulta en el JSON trae muchisima información, como nombre de usuario, ubicacion (lat, lng), número,website,etc
7. ¿Por qué funciona un solo listener en `lista` para botones creados después?
    Porque para que se cree un error debe ejecutarse la acción, si todavía no existen cuando se crea el evento, no hay problema pues no se ejecuta nada
8. ¿Qué pasa si quitas `JSON.stringify` al guardar favoritos? Compruébalo y vuelve a ponerlo.
    Se crashea la página al querer buscar un elemento guardado en favoritos sin la forma de tener las cosas guardads en favoritos
9. ¿En qué se diferencia `localStorage` de una variable normal?
    Local storage almacena información en la caché, aunque se reinicie la página, se mantendrá guardada la información

## Retos extra realizados

- [Escribe aquí los retos que realmente implementes, o indica «Ninguno».]

## Capturas pendientes para la entrega

Guarda en `capturas/` las imágenes `movil.png` (375px), `tablet.png` (768px), `escritorio.png` (1280px) y `favoritos.png` (Local Storage con la clave `favoritos`). Después comprime la carpeta completa con el nombre solicitado por el docente.
