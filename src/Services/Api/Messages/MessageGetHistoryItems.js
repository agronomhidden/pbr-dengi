import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageGetHistoryItems extends AbstractMessage {

    static METHOD = 'payments/history-item';

    /**
     * @param {string} transaction_uuids
     * @param {int} advanced
     * @param {int} with_new
     */
    constructor(transaction_uuids, with_new = 0, advanced = 1) {
        super()
        if (Validator.isNull(transaction_uuids)) {
            throw new TypeError('transaction_uuids must not be NULL')
        }
        transaction_uuids = transaction_uuids.split(',')

        this.args = {transaction_uuids, advanced}
    }
}