import AbstractMesage from './AbstractMessage';

export default class MessageGetUser extends AbstractMesage {

    static GET_USER_METHOD = 'user/get';

    getMethod = () => MessageGetUser.GET_LOCATION_METHOD

    constructor(token){

    }



}