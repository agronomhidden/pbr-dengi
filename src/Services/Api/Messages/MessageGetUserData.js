import AbstractMessage from './AbstractMessage';
import {TOKEN} from "../../../CONSTANTS"

export default class MessageGetUserData extends AbstractMessage {

    static METHOD = 'invoices/get-user-data';

    constructor(token) {
        super()
        this.args = {[TOKEN]: token}
    }
}