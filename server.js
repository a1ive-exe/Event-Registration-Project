const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

let participants = [];

app.post('/register', (req, res) => {
    const { name, email, contact, eventPreference } = req.body;

    participants.push({ name, email, contact, eventPreference });

    res.json({ message: 'Registration successful' });
});

app.get('/registrants', (req, res) => {
    res.json(participants);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

