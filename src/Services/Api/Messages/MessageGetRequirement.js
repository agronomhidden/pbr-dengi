import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageGetRequirement extends AbstractMessage {

    static METHOD = 'user/recharge-requirement';

    /**
     * @param {string} transaction_uuids
     * @param {string} access_token
     */
    constructor(access_token, transaction_uuids) {
        super()
        if (Validator.isNull(access_token)) {
            throw new TypeError('access_token, do not must be NULL')
        }
        if (Validator.isNull(transaction_uuids)) {
            throw new TypeError('transaction_uuids must not be NULL')
        }
        transaction_uuids = transaction_uuids.split(',')

        this.args = {access_token, transaction_uuids}
    }
}