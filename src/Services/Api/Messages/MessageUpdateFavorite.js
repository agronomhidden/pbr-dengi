import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageUpdateFavorite extends AbstractMessage {

    static METHOD = 'payments/update-favorite';

    /**
     * @param {string} access_token
     * @param {string} id
     * @param {string | null} name
     */
    constructor(access_token, id, name = null) {
        super()

        if (Validator.isNull(access_token) || Validator.isNull(id)) {
            throw new Error('arguments(access_token,id) do not must be NULL')
        }

        if (!Validator.isInt(id)) {
            throw new TypeError('id must be integer')
        }

        this.args = {access_token, id, name}
    }
}