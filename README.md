# Setup
The setup instructions below assumes that you already have NodeJS installed in your device.

1. Clone the repository\
`git clone https://github.com/CoreVisional/MI-Telegram-Bot.git`

2. Change directory into the project\
`cd MI-Telegram-Bot`

3. Run the command below to install the depedencies\
`npm install`

4. Run the copy to have your own .env file\
`cp .env.example .env`

5. Create your database in MongoDB and connect to your application.

6. In your .env file, paste your Telegram bot token given by BotFather and your OpenWeather API Key\
`BOT_TOKEN=`\
`OPENWEATHER_API_KEY=`

7. To get your Bot Token, go to [BotFather](https://t.me/botfather)

8. To get your OpenWeather API Key, you have to register an account on [OpenWeather](https://openweathermap.org/)

# Usage
To run the Telegram bot, run `node index.js` in your terminal.

## Usage Examples
- #### /weather (location)
    Run `/weather Kuala Lumpur, MY` command in your Telegram bot to pull in the description of current weather in the specified location, the temperature, and humidity. The location can accept various location formats, but a more accurate result can be produced by specifying the city name and country code.

- #### /ipv4
    Run `/ipv4` command in your Telegram bot to return the client IP Address

- #### /save_note (message)
    Run `/save_note Test` command in your Telegram bot to save your note.

# TODO
- [x] Create /weather command
- [x] Create /ipv4 command
- [x] Create /save_note command
- [ ] Create /view_notes command
