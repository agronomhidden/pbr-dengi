import Validator from "../ParamsValidator"
import AbstractMessage from "./AbstractMessage"

export default class MessageGetFavoriteItem extends AbstractMessage {

    static METHOD = 'payments/favorite-item';

    /**
     * @param {string} access_token
     * @param {integer} id
     */
    constructor(access_token, id) {
        super()
        if (!access_token) {
            throw new Error('access_token do not must be NULL')
        }
        if (!id || !Validator.isInt(id)) {
            throw new TypeError('id must be integer')
        }
        this.args = {access_token, id}
    }

}