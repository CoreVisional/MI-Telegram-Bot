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
    // Get the location from the message
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

// Code for /save_note command
bot.command("save_note", (ctx) => {
        // Get the note from the message
        const note = ctx.message.text.split("/save_note")[1]?.trim();

        if (note) {
            try {
                // Add note to the db.json file
                db.get("notes").push({ id: Date.now(), content: note }).write();

                // Get the total number of notes
                const totalNotes = db.get("notes").size().value();

                const noteWord = totalNotes === 1 ? "note" : "notes";

                ctx.reply(
                    `Your note has been saved successfully. \n\nYou have a total of ${totalNotes} ${noteWord} saved.`
                );
            } catch (error) {
                ctx.reply(
                    "Error: Unable to save the note. Please try again later."
                );
            }
        } else {
            ctx.reply(
                'Error: Invalid format. Please use "/save_note {Your Message}"'
            );
        }
});

// Launch the bot
bot.launch();
