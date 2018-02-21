import AbstractMesage from './AbstractMessage';

export default class MessageGetLocation extends AbstractMesage {

    static GET_LOCATION_METHOD = 'locations';

    getMethod = () => MessageGetLocation.GET_LOCATION_METHOD

}