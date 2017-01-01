import Bot from './bot';


class SlackBot extends Bot {
    constructor(token) {
        super(token);
    }

    sendMessage(message) {
        console.log('send: ' + message)
    }

    getType() {
        return 'slack';
    }
}

export default SlackBot;