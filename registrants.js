async function fetchRegistrants() {
    const response = await fetch('/registrants');
    const registrants = await response.json();
    
    const container = document.getElementById('registrantsList');
    container.innerHTML = '';

    if (registrants.length === 0) {
        container.innerHTML = '<p>No participants registered yet.</p>';
        return;
    }

    registrants.forEach((user, index) => {
        const div = document.createElement('div');
        div.innerHTML = `<p><strong>${index + 1}. ${user.name}</strong> - ${user.email} (${user.contact}) | Event: ${user.eventPreference}</p>`;
        container.appendChild(div);
    });
}

fetchRegistrants();
