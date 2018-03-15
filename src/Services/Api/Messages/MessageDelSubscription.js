import AbstractMessage from './AbstractMessage';
import Validator from "../ParamsValidator"

export default class MessageTotalLogout extends AbstractMessage {

    static METHOD = 'user/del-subscription'

    /**
     * @param {string} access_token
     */
    constructor(access_token) {
        super()

        if (Validator.isNull(access_token)) {
            throw new Error('access_token, do not must be NULL')
        }

        this.args = {access_token}
    }

}