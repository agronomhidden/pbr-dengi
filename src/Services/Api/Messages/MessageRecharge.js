import AbstractMessage from "./AbstractMessage"
import Validator from "../ParamsValidator"

export default class MessageGetRequirement extends AbstractMessage {

    static METHOD = 'user/recharge';

    /**
     * @param {string} access_token
     * @param {string} first_name
     * @param {string} last_name
     * @param {string} email
     * @param {string} sum
     * @param {string} transaction_uuids
     */
    constructor(access_token, first_name, last_name, email, sum, transaction_uuids) {
        super()

        if (Validator.isNull(access_token)) {
            throw new TypeError('access_token, do not must be NULL')
        }
        if (Validator.isNull(first_name)) {
            throw new TypeError('first_name, do not must be NULL')
        }
        if (Validator.isNull(last_name)) {
            throw new TypeError('last_name, do not must be NULL')
        }
        if (Validator.isNull(email)) {
            throw new TypeError('email, do not must be NULL')
        }
        if (Validator.isNull(sum) && !Validator.isInt(sum)) {
            throw new TypeError('sum must not be NULL && sum must be integer')
        }
        if (Validator.isNull(transaction_uuids)) {
            throw new TypeError('transaction_uuids must not be NULL')
        }

        transaction_uuids = transaction_uuids.split(',')

        this.args = {access_token, first_name, last_name, email, sum, transaction_uuids}
    }
}