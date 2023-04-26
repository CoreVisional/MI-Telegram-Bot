// Import required modules
const { Telegraf } = require("telegraf");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const axios = require("axios");

// Load environment variables
require("dotenv").config();

// Setup database and bot
const adapter = new FileSync("database/db.json");
const db = low(adapter);

// Initiatize database with default structure
db.defaults({ notes: [] }).write();

// Create new bot instance
const bot = new Telegraf(process.env.BOT_TOKEN);

// OpenWeather API Key
const openweatherApiKey = `${process.env.OPENWEATHER_API_KEY}`;

// Start bot
bot.start((ctx) => {
    ctx.reply(
        "Welcome! I am a bot that provides the following commands:\n\n/weather (Location)\n/ipv4\n/save_note (Your Message)\n/view_notes"
    );
});

// Code for /weather command
bot.command("weather", async (ctx) => {
    const location = ctx.message.text.split("/weather")[1]?.trim();

    if (location) {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${openweatherApiKey}&units=metric`
            );

            const weatherDescription = response.data.weather[0].description;
            const weatherTemperature = response.data.main.temp;
            const weatherHumidity = response.data.main.humidity;

            ctx.reply(
                `The weather in ${location} is ${weatherDescription} with a temperature of ${weatherTemperature}°C and humidity of ${weatherHumidity}%`
            );
        } catch {
            ctx.reply(
                "Error: Unable to fetch weather data. Please check the location name and try again."
            );
        }
    } else {
        ctx.reply('Error: Invalid format. Please use "/weather {location}"');
    }
});

// Code for /ipv4 command
bot.command("ipv4", async (ctx) => {
    try {
        const response = await axios.get("https://api.ipify.org");
        const ipAddress = response.data;
        ctx.reply(`Your IPv4 address is: ${ipAddress}`);
    } catch (error) {
        ctx.reply("Error: Unable to fetch your IP address.");
    }
});

// Launch the bot
bot.launch();
