class Bot {
    id = null;
    data = {};
    bot = null;
    status = 'processing';

    constructor(token) {
        this.id = token._id;
        this.data = token;
    }

    getType() {
        throw Error('Need to implement');
    }

    sendMessage(message) {
        throw Error('Need to implement');
    }

    get(param) {
        return typeof(this.data[param]) !== 'undefined' && this.data[param];
    }
}

export default Bot;
