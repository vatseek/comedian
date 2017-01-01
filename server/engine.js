import Bots from './bots';
import _ from 'underscore';


class Application {
    tokens = [];
    ticktime = 5000;
    botsEngine = null;

    constructor(ticksTime) {
        this.ticktime = ticksTime || 5000;
    }

    isReady() {
        return !_.isEmpty(this.botsEngine);
    }

    start() {
        setTimeout(() => {
            this.start();
            if (!this.isReady()) {
                return false;
            }

            this.botsEngine.message('#tesdfd *bold text* _italic text_ [http://google.com](URL) `inline fixed-width code` ```pre-formatted fixed-width code block```');
        }, this.ticktime);
    }

    addToken(token) {
        if (!this.isReady()) {
            return false;
        }
        this.botsEngine.add(token);
    }

    removeTokenById(id) {
        throw new Error('Implement!');
    }

    loadData(tokens) {
        this.botsEngine = new Bots(tokens);
    }
}

export default Application;
