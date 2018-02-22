export default class AbstractMessage {

    args = {}

    constructor() {
        if (new.target === AbstractMessage) {
            throw new TypeError('Cannot construct Abstract instances directly');
        }
    }

    getMethod(){}

    getMessage() {
        console.log(this.args);
        return {
            method: this.getMethod(),
            args: this.args
        }
    }
}