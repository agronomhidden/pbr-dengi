import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageDelFavorite extends AbstractMessage {

    static METHOD = 'payments/del-favorite';

    /**
     * @param {string} access_token
     * @param {integer} id
     */
    constructor(access_token, id) {
        super()

        if (Validator.isNull(access_token) || Validator.isNull(id) ) {
            throw new Error('arguments(access_token,id) do not must be NULL')
        }

        if (!Validator.isInt(id)) {
            throw new TypeError('id must be integer')
        }

        this.args = {access_token, id}
    }
}