import AbstractMessage from "./AbstractMessage"

export default class MessageChangePassword extends AbstractMessage {

    static METHOD = 'user/change-password';

    /**
     * @param {string|null} access_token
     * @param {string} password
     * @param {string} passwordRepeat
     */
    constructor(access_token, password, passwordRepeat) {
        super()
        this.args = {access_token, password, passwordRepeat}
    }
}