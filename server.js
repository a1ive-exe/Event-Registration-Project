const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  console.log(req.body);
  res.json({ message: 'Registration successful' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
