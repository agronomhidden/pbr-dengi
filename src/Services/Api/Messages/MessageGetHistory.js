import AbstractMessage from "./AbstractMessage"
import {TOKEN} from "../../../CONSTANTS"

export default class MessageGetHistory extends AbstractMessage {

    static METHOD = 'payments/history';

    /**
     * @param {string| null} access_token
     * @param {string| null} date_from
     * @param {string| null} date_to
     * @param {int} page
     * @param {int} per_page
     * @param {string|null} access_token
     */
    constructor(access_token, date_from = null, date_to = null, page = 1, per_page = 10) {
        super()
        this.args = {per_page, page, date_from: date_from, date_to, access_token}
    }
}