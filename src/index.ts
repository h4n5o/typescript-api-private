import express from 'express';
import todoSequelize from './database/setup/database';

const app = express();
const PORT = process.env.PORT || 3000;

// Einfache Benutzerroute
app.get('/user', async (req, res) => {
  try {
    // Hier kann man auf seine Sequelize-Modelle zugreifen und Daten aus der Datenbank abrufen.
    const users = await todoSequelize.models.User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzerdaten:', error);
    res.status(500).send('Ein Fehler ist aufgetreten.');
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
