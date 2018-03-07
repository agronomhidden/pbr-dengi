import AbstractMessage from "./AbstractMessage"
import {TOKEN} from "../../../CONSTANTS"
import Validator from "../ParamsValidator"

export default class MessageGetHistory extends AbstractMessage {

    static METHOD = 'payments/history';

    /**
     * @param {string} access_token
     * @param {string| null} date_from
     * @param {string| null} date_to
     * @param {int} page
     * @param {int} per_page
     */
    constructor(access_token, date_from = null, date_to = null, page = 1, per_page = 10) {
        super()
        if (Validator.isNull(access_token)) {
            throw new Error('access_token, do not must be NULL')
        }

        this.args = {access_token, per_page, page, date_from, date_to}
    }
}