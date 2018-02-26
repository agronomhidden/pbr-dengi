import AbstractMessage from "./AbstractMessage"
import {TOKEN} from "../../../CONSTANTS"

export default class MessageGetHistory extends AbstractMessage {

    static GET_PAYMENTS_HISTORY = 'payments/history';

    getMethod = () => MessageGetHistory.GET_PAYMENTS_HISTORY

    /**
     * @param {{}|null} params
     * @param {string|null} token
     */
    constructor(params = {}, token) {
        super()
        this.args = {per_page: 10, page: 1, date_from: params.date_from, date_to: params.date_to, [TOKEN]: token}
    }

}