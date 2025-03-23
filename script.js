document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const formMessage = document.getElementById('form-message');

    function validateName(name) {
        return name.trim() !== '';
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validatePhone(phone) {
        const regex = /^\d{10}$/; 
        return regex.test(phone);
    }

    function validateEvent(event) {
        return event !== '';
    }

    function displayError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + '-error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();
        formMessage.textContent = '';

        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            event: form.event.value
        };

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

        if (!isValid) {
            formMessage.textContent = 'Please correct the errors in the form.';
            formMessage.classList.add('error');
            return;
        }

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
