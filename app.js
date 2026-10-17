// 1. Referencias a elementos del HTML y datos de la aplicación.
const URL_API = 'https://jsonplaceholder.typicode.com/users';
const lista = document.querySelector('#lista');
const estado = document.querySelector('#estado');
const buscador = document.querySelector('#buscador');

let usuarios = [];
// localStorage guarda texto: convertimos la cadena JSON de vuelta a un arreglo.
let favoritos = [];
try {
    const guardados = JSON.parse(localStorage.getItem('favoritos'));
    if (Array.isArray(guardados)) {
        favoritos = guardados;
    } else {
        localStorage.removeItem('favoritos');
    }
} catch (error) {
    // Si el texto no es JSON válido (por ejemplo "1,2"), empezamos de nuevo.
    localStorage.removeItem('favoritos');
}

function guardarFavoritos() {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

// 2. Pedimos los usuarios. await espera la respuesta sin congelar la página.
async function cargarUsuarios() {
    try {
        const res = await fetch(URL_API);
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

        usuarios = await res.json();
        aplicarFiltro();
    } catch (error) {
        estado.textContent = 'No se pudieron cargar los usuarios.';
        console.error(error);
    }
}

// 3. Creamos las tarjetas a partir de los datos recibidos.
function mostrarUsuarios(datos) {
    lista.innerHTML = '';

    datos.forEach((u) => {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'tarjeta';
        const esFav = favoritos.includes(u.id);

        tarjeta.innerHTML = `
            <h2>${u.name}</h2>
            <p>${u.email}</p>
            <p>Ciudad: ${u.address.city}</p>
            <p>Empresa: ${u.company.name}</p>
            <button class="fav ${esFav ? 'activo' : ''}" data-id="${u.id}" type="button">
                ${esFav ? 'Favorito' : 'Marcar favorito'}
            </button>
        `;
        lista.appendChild(tarjeta);
    });
}

// 4. Filtramos el arreglo original y volvemos a dibujar las tarjetas.
function aplicarFiltro() {
    const texto = buscador.value.toLowerCase().trim();
    const filtrados = usuarios.filter((u) =>
        u.name.toLowerCase().includes(texto)
    );

    mostrarUsuarios(filtrados);
    estado.textContent = texto
        ? `${filtrados.length} resultado(s)`
        : `${usuarios.length} usuarios cargados`;
}

buscador.addEventListener('input', aplicarFiltro);

// 5. Un solo listener sirve para todos los botones, incluso tras redibujar las tarjetas.
lista.addEventListener('click', (e) => {
    if (!e.target.classList.contains('fav')) return;

    const id = Number(e.target.dataset.id);
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter((f) => f !== id);
    } else {
        favoritos.push(id);
    }

    guardarFavoritos();
    aplicarFiltro();
});

// Iniciamos la carga al abrir la página.
cargarUsuarios();
