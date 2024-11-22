async function fetchEvents() {
    const response = await fetch('https://backendpodcats.vercel.app/api/events');
    const data = await response.json();
    renderEvents(data);
}

function renderEvents(events) {
    const eventosContainer = document.getElementById('eventos');
    eventosContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar los eventos

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('glass-effect', 'rounded-2xl', 'p-6', 'card-hover');
        eventCard.setAttribute('data-aos', 'fade-up'); // Animación AOS

        eventCard.innerHTML = `
            <div class="relative">
                <img src="img/${event.image}" alt="${event.title}" class="rounded-xl mb-4 w-full" />
                <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    ${event.status}
                </div>
            </div>
            <h3 class="text-xl font-bold mb-2">${event.title}</h3>
            <p class="text-gray-400 mb-4">${event.date}</p>
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-300">${event.location}</span>
                <button class="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
                    Ver
                </button>
            </div>
        `;

        eventosContainer.appendChild(eventCard);
    });
}

// Llamar a la función para cargar los eventos al cargar la página
window.onload = fetchEvents;
