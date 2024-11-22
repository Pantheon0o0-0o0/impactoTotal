const eventForm = document.getElementById('eventForm');
const eventTable = document.getElementById('eventTable');

// Obtener eventos
async function fetchEvents() {
    try {
        const response = await fetch('https://backendpodcats.vercel.app/api/events');  // Cambia la URL por la correcta
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
    }
}

// Guardar un nuevo evento
async function saveEvent(event) {
    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('date', event.date);
    formData.append('location', event.location);
    formData.append('status', event.status);
    if (event.image) formData.append('image', event.image);

    try {
        const response = await fetch('https://backendpodcats.vercel.app/api/events', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        fetchEvents();
    } catch (error) {
        console.error('Error al guardar el evento:', error);
    }
}

// Eliminar evento
async function deleteEvent(index) {
    try {
        const response = await fetch(`https://backendpodcats.vercel.app/api/events/${index}`, { method: 'DELETE' });

        if (!response.ok) {
            throw new Error(`Error al eliminar el evento: ${response.statusText}`);
        }

        fetchEvents();
    } catch (error) {
        console.error('Error al eliminar el evento:', error);
    }
}

// Renderizar la tabla de eventos
function renderTable(events) {
    eventTable.innerHTML = '';
    events.forEach((event, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border-b px-4 py-2">${event.title}</td>
            <td class="border-b px-4 py-2">${event.date}</td>
            <td class="border-b px-4 py-2">${event.location}</td>
            <td class="border-b px-4 py-2">${event.status}</td>
            <td class="border-b px-4 py-2">
                <button class="text-red-500" onclick="deleteEvent(${index})">Eliminar</button>
            </td>
        `;
        eventTable.appendChild(row);
    });
}

// Enviar formulario de nuevo evento
eventForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const status = document.getElementById('status').value;
    const image = document.getElementById('image').files[0];

    const newEvent = { title, date, location, status, image };
    saveEvent(newEvent);
    eventForm.reset();
});

// Inicializar
fetchEvents();
