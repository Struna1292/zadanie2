const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT;
const AUTHOR = "Kacper Kowalczyk"; 
const API_KEY = process.env.API_KEY;

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/sprawdz', async (req, res) => {
  const { location } = req.body; // wczytanie wybranej lokacji z formularza
  
  const [country, city] = location.split('-').map(x => x.trim()); // rozdzielenie na kraj i miasto

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&lang=PL`);
    const weather = response.data.weather[0].description;
    const tempInKelvin = response.data.main.temp; // wczytanie temperatury domyslnie w kelvinach
    const tempInCelsius = Math.round(tempInKelvin - 273.15);

    res.send(`
      <h1>Pogoda w ${city}, ${country}</h1>
      <p>${weather}, temperatura: ${tempInCelsius}°C</p>
    `);
  } catch (error) {
    console.error(error.message);
  }
});


app.listen(PORT, () => {
    console.log(`Data uruchomienia: ${new Date().toLocaleString('pl-PL',{timeZone: 'Europe/Warsaw'})}, Autor: ${AUTHOR}`);
    console.log(`Serwer nasłuchuje na porcie ${PORT}`);
});
