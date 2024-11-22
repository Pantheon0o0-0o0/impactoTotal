const eventForm = document.getElementById('eventForm');
const eventTable = document.getElementById('eventTable');

async function fetchEvents() {
    const response = await fetch('https://backendpodcats.vercel.app/api/events');
    const data = await response.json();
    renderTable(data);
}

async function saveEvent(event) {
    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('date', event.date);
    formData.append('location', event.location);
    formData.append('status', event.status);
    if (event.image) formData.append('image', event.image);

    await fetch('/api/events', {
        method: 'POST',
        body: formData,
    });
    fetchEvents();
}

async function deleteEvent(index) {
    await fetch(`/api/events/${index}`, { method: 'DELETE' });
    fetchEvents();
}

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
