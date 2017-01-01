import Bot from './bot';
const TeleBot = require('telebot');
import config from '../config';


class TelegramBot extends Bot {
    static engine = false;
    static ready = false;

    constructor(token) {
        super(token);
        if (!TelegramBot.engine) {
            TelegramBot.init();
        }
        this.status = 'ready';
    }

    static init() {
        TelegramBot.engine = new TeleBot(config.get("telegram:token"));
        TelegramBot.ready = true;
        TelegramBot.engine.on('connect', () => {
            console.log('connected');
        });

        TelegramBot.engine.on('disconnect', () => {
            console.log('disconnected');
            TelegramBot.engine = null;
            TelegramBot.ready = false;
            TelegramBot.init();
        });
    };

    getType() {
        return 'telegram';
    }

    sendMessage(message) {
        if (!TelegramBot.ready) {
            return;
        }
        // TODO: get channel
        TelegramBot.engine.sendMessage(
            '-1001085315678',
            message,
            {parse: 'markdown', skipReport: true}
        );
    }
}

export default TelegramBot;
