import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageAddFavorite extends AbstractMessage {

    static METHOD = 'payments/add-favorite';

    /**
     * @param {string} access_token
     * @param {string} key
     * @param {string | null} name
     */
    constructor(access_token, key, name = null) {
        super()
        if (!access_token) {
            throw new Error('access_token do not must be NULL')
        }
        if (!key) {
            throw new Error('key do not must be NULL')
        }

        this.args = {access_token, key, name}
    }
}