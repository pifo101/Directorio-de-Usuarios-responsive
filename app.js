const URL_API = 'https://jsonplaceholder.typicode.com/users';
const lista = document.querySelector('#lista');
const estado = document.querySelector('#estado');
const buscador = document.querySelector('#buscador');
const botonTema = document.querySelector('#modo-oscuro');
const botonUbicacion = document.querySelector('#mi-ubicacion');
const ubicacion = document.querySelector('#ubicacion');

let usuarios = [];
let favoritos = [];
try {
    const guardados = JSON.parse(localStorage.getItem('favoritos'));
    if (Array.isArray(guardados)) {
        favoritos = guardados;
    } else {
        localStorage.removeItem('favoritos');
    }
} catch (error) {
    localStorage.removeItem('favoritos');
}

const temaGuardado = localStorage.getItem('tema');
if (temaGuardado === 'dark' || temaGuardado === 'light') {
    document.documentElement.dataset.theme = temaGuardado;
}
actualizarBotonTema();

function guardarFavoritos() {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

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

function actualizarBotonTema() {
    const oscuro = getComputedStyle(document.documentElement).colorScheme === 'dark';
    botonTema.textContent = oscuro ? 'Modo claro' : 'Modo oscuro';
}

botonTema.addEventListener('click', () => {
    const oscuro = getComputedStyle(document.documentElement).colorScheme === 'dark';
    const tema = oscuro ? 'light' : 'dark';
    document.documentElement.dataset.theme = tema;
    localStorage.setItem('tema', tema);
    actualizarBotonTema();
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', actualizarBotonTema);

botonUbicacion.addEventListener('click', () => {
    if (!navigator.geolocation) {
        ubicacion.textContent = 'Tu navegador no permite obtener la ubicación.';
        return;
    }

    ubicacion.textContent = 'Obteniendo ubicación...';
    navigator.geolocation.getCurrentPosition(
        (posicion) => {
            ubicacion.textContent = `Latitud: ${posicion.coords.latitude.toFixed(5)}, longitud: ${posicion.coords.longitude.toFixed(5)}`;
        },
        (error) => {
            ubicacion.textContent = error.code === 1
                ? 'No se concedió permiso para obtener la ubicación.'
                : 'No se pudo obtener la ubicación.';
        }
    );
});

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

cargarUsuarios();
