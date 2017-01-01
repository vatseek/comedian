import TelegramBot from './telegram';
import SlackBot from './slack';
import _ from 'underscore';

class Bots {
    bots = [];

    constructor(tokens) {
        tokens.forEach(token => {
            this.add(token);
        });
    }

    add(token) {
        const duplicates = this.bots.filter((bot) => {
            if (bot.getType() === 'telegram') {
                return bot.get('channel') == token.channel;
            } else if (bot.getType() === 'slack') {
                return bot.get('token') == token.token;
            } else {
                throw Error('Invalid bot type');
            }
        });

        if (!_.isEmpty(duplicates)) {
            return;
        }

        if (token.type === 'telegram') {
            const bot = new TelegramBot(token);
            this.bots.push(bot);
        } else if (token.type == 'slack') {
            const bot = new SlackBot(token);
            this.bots.push(bot);
        } else {
            throw Error('Invalid bot type');
        }

        return true;
    }

    remove(botId) {
        // TODO: remove
        this.bots = this.bots.filter( bot => {
            return bot.id != botId;
        });
    }

    change() {
        // TODO: change
    }

    message(message) {
        this.bots.forEach(bot => {
            bot.sendMessage(message);
        });
    }
}

export default Bots;
