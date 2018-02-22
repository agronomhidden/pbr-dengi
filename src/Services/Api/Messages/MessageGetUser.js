import AbstractMessage from './AbstractMessage';
import {TOKEN} from "../../../CONSTANTS"

export default class MessageGetUser extends AbstractMessage {

    static GET_USER_METHOD = 'user/get';

    getMethod = () => MessageGetUser.GET_USER_METHOD

    constructor(token) {
        super()
        this.args = {[TOKEN]: token}
    }
}