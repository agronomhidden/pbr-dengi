import AbstractMessage from "./AbstractMessage"

export default class MessageLoginUser extends AbstractMessage {

    static LOGIN_USER = 'user/login';

    getMethod = () => MessageLoginUser.LOGIN_USER

    /**
     * @param {string|null} params
     */
    constructor(params) {
        super()
        this.args = params
    }

}