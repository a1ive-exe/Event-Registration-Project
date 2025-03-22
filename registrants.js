document.addEventListener('DOMContentLoaded', () => {
    const registrantsList = document.getElementById('registrants-list');

    async function fetchRegistrants() {
        try {
            const response = await fetch('/registrants');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const registrants = await response.json();

            registrantsList.innerHTML = ''; // Clear existing list

            if (registrants.length === 0) {
                registrantsList.innerHTML = '<p>No participants registered yet.</p>';
                return;
            }

            const listElement = document.createElement('ul');
            registrants.forEach((user, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${index + 1}. ${user.name} - ${user.email} (${user.phone}) - Event: ${user.event} on ${user.date}`;
                listElement.appendChild(listItem);
            });
            registrantsList.appendChild(listElement);

        } catch (error) {
            console.error('Fetch error:', error);
            registrantsList.innerHTML = '<p>Error fetching registrants.</p>';
        }
    }

    fetchRegistrants();
});
