const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/weather", async (req, res) => {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.3827&longitude=-2.7191&current_weather=true";

    const response = await fetch(url);
    const data = await response.json();

    res.json({
        weathercode: data.current_weather.weathercode,
        temperature: data.current_weather.temperature
    });
});

app.listen(3000, () => console.log("Running"));
