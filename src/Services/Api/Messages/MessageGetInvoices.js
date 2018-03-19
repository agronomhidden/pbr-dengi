import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageGetInvoices extends AbstractMessage {

    static METHOD = 'invoices/get-current';

    /**
     * @param {string} access_token
     */
    constructor(access_token) {
        super()
        if (Validator.isNull(access_token)) {
            throw new Error('access_token, must not be NULL')
        }
        this.args = {access_token}
    }
}
