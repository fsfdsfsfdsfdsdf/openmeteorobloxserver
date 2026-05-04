const express = require("express");
const fetch = require("node-fetch");

const app = express();

// Use dynamic port for hosting services (VERY IMPORTANT)
const PORT = process.env.PORT || 3000;

// Bristol Airport coords
const LAT = 51.3827;
const LON = -2.7191;

app.get("/", (req, res) => {
    res.send("Roblox Weather Proxy Running");
});

app.get("/weather", async (req, res) => {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`;

        const response = await fetch(url);
        const data = await response.json();

        res.json({
            weathercode: data.current_weather.weathercode,
            temperature: data.current_weather.temperature,
            windspeed: data.current_weather.windspeed
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch weather" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
