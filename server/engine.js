class Application {
    tokens = [];
    ticktime = 5000;

    constructor(ticksTime) {
        this.ticktime = ticksTime || 5000;
    }

    start() {
        setTimeout(() => {
            this.start();
            console.log(this.tokens);
        }, this.ticktime);
    }

    addToken(token) {
        this.tokens.push(token);
    }

    removeTokenById(id) {
        this.tokens = this.tokens.filter((token) => {
              return token._id != id;
        });
    }

    loadData(tokens) {
        this.tokens = tokens;
    }
}

export default Application;
