import AbstractMessage from './AbstractMessage';
import {TOKEN} from "../../../CONSTANTS"

export default class MessageGetUser extends AbstractMessage {

    static METHOD = 'user/get';

    constructor(token) {
        super()
        this.args = {[TOKEN]: token}
    }
}