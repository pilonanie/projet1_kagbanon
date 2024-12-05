const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/', userRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
