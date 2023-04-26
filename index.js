// Import required modules
const { Telegraf } = require("telegraf");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const axios = require("axios");

// Load environment variables
require("dotenv").config();

// Setup database and bot
const adapter = new FileSync("db.json");
const db = low(adapter);

// Initiatize database with default structure
db.defaults({ notes: [] }).write();

// Create new bot instance
const botToken = new Telegraf(process.env.BOT_TOKEN);

// OpenWeather API Key
const apiKey = `${process.env.OPEN_WEATHER_API_KEY}`;

// Start bot
bot.start((ctx) => {
    ctx.reply(
        "'Welcome! I am a bot that provides the following commands:\n/weather\n/ipv4\n/save_note {message}\n/view_notes'"
    );
});

// Weather command
bot.command("weather", async (ctx) => {
    const location = ctx.message.text.split("/weather")[1]?.trim();

    if (location) {

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
            );

            const weatherDescription = response.data.weather[0].description;

        } catch {
            //
        }
    }
});

// Launch the bot
bot.launch();
