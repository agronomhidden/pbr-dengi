import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageGetFavorites extends AbstractMessage {

    static METHOD = 'payments/favorites';

    /**
     * @param {string} access_token
     * @param {int} advanced
     */
    constructor(access_token, advanced = 1) {
        super()

        if (Validator.isNull(access_token)) {
            throw new Error('access_token, do not must be NULL')
        }
        if (!Validator.isInt(advanced)) {
            throw new Error('advanced must be integer')
        }

        this.args = {access_token, advanced}
    }
}