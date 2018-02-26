import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageGetHistoryItems extends AbstractMessage {

    static GET_PAYMENTS_HISTORY_ITEMS = 'payments/history-item';

    getMethod = () => MessageGetHistoryItems.GET_PAYMENTS_HISTORY_ITEMS

    /**
     * @param {{}} params
     */
    constructor(params) {
        super()
        if (Validator.isNull(params.transaction_uuids)) {
            throw new TypeError('transaction_uuids do not must be NULL')
        }
        params.transaction_uuids = params.transaction_uuids.split(',')
        params.advanced = 1
        this.args = params
    }
}