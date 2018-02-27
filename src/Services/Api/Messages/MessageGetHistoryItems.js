import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageGetHistoryItems extends AbstractMessage {

    static METHOD = 'payments/history-item';

    /**
     * @param {{}} params
     */
    constructor(params) {
        super()
        /** @todo рефакторить (см. MessageGetHistory)*/
        if (Validator.isNull(params.transaction_uuids)) {
            throw new TypeError('transaction_uuids must not be NULL')
        }
        params.transaction_uuids = params.transaction_uuids.split(',')
        params.advanced = 1
        this.args = params
    }
}