const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('views'));

// Routes
app.use('/api', userRoutes);

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
