import AbstractMessage from "./AbstractMessage"
import {TOKEN} from "../../../CONSTANTS"

export default class MessageGetHistory extends AbstractMessage {

    static METHOD = 'payments/history';

    /**
     * @param {{}|null} params
     * @param {string|null} token
     */
    constructor(params = {}, token) {
        super()
        /** @todo это нужно вынести в параметры constructor(access_token, page=1, per_page=10, date_from = null, date_to = null)*/
        this.args = {per_page: 10, page: 1, date_from: params.date_from, date_to: params.date_to, [TOKEN]: token}
    }

}