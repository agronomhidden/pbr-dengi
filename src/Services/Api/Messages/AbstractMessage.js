export default class AbstractMessage {

    args = {}

    getMethod(){}

    getMessage() {
        return {
            method: this.getMethod(),
            args: this.args
        }
    }
}