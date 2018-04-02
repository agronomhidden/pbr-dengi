import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageGetBalance extends AbstractMessage {

    static METHOD = 'user/get-balance';

    /**
     * @param {string} access_token
     */
    constructor(access_token) {
        super()
        if (!Validator.isExist(access_token)) {
            throw new Error('access_token, don\'t must be NULL or undefined')
        }
        this.args = {access_token}
    }
}