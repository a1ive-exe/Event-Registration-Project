document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const formMessage = document.getElementById('form-message');

    // Validation functions
    function validateName(name) {
        return name.trim() !== '';
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validatePhone(phone) {
        const regex = /^{10}$/; // Basic 10-digit check
        return regex.test(phone);
    }

    function validateEvent(event) {
        return event !== '';
    }

    function validateDate(date) {
        return date !== '';
    }

    // Error display function
    function displayError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + '-error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    // Clear all errors
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(error => error.textContent = '');
    }

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();
        formMessage.textContent = ''; // Clear any previous messages

        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            event: form.event.value,
            date: form.date.value,
        };

        // Perform validation
        let isValid = true;

        if (!validateName(formData.name)) {
            displayError('name', 'Name is required');
            isValid = false;
        }

        if (!validateEmail(formData.email)) {
            displayError('email', 'Invalid email format');
            isValid = false;
        }

        if (!validatePhone(formData.phone)) {
            displayError('phone', 'Invalid phone number');
            isValid = false;
        }

        if (!validateEvent(formData.event)) {
            displayError('event', 'Please select an event');
            isValid = false;
        }

        if (!validateDate(formData.date)) {
            displayError('date', 'Please select a date');
            isValid = false;
        }

        if (!isValid) {
            formMessage.textContent = 'Please correct the errors in the form.';
            formMessage.classList.add('error');
            return;
        }

        // Send data to the server
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                form.reset();
                formMessage.textContent = result.message;
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
            } else {
                formMessage.textContent = result.error || 'Registration failed';
                formMessage.classList.add('error');
            }

        } catch (error) {
            console.error('Fetch error:', error);
            formMessage.textContent = 'An unexpected error occurred. Please try again.';
            formMessage.classList.add('error');
        }
    });
});
