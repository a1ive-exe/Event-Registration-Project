const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

let participants = [];

const registrationValidationRules = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('phone').trim().notEmpty().withMessage('Phone is required').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits'),
    body('event').trim().notEmpty().withMessage('Event selection is required')
];

app.post('/register', registrationValidationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, event } = req.body;
    participants.push({ name, email, phone, event });
    res.json({ message: 'Registration successful' });
});

app.get('/registrants', (req, res) => {
    res.json(participants);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
