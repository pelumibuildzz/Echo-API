const app = require('./app.js');
const { config } = require('./config/config.js');
const mongoose = require('mongoose');
const bot = require("./telegram/bot.js");

const PORT = config.PORT;
const mongoUrl = config.MONGO_URL;

const maxRetries = 5;
let retries = 0;


const connectWithRetry = () => {
    console.log(`MongoDB connection attempt ${retries + 1}`);

    mongoose.connect(mongoUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            bot.setWebHook(`${process.env.APP_URL}/telegram-webhook`)
                .then(() => console.log("Telegram webhook set successfully"))
                .catch(console.error);
        });
    }).catch((err) => {
        retries += 1;
        console.log(`Error connecting to database: ${err.message}`);
        if (retries < maxRetries) {
            console.log(`Retrying to connect to database (${retries}/${maxRetries})...`);
            setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
        } else {
            console.log('Max retries reached. Could not connect to database.');
        }
    });
};

connectWithRetry();