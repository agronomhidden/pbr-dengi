import AbstractApiParamsContainer from './AbstractApiParamsContainer'
import {LOCATION_ID, TOKEN} from "../../CONSTANTS";

export default class ClientApiParamsContainer extends AbstractApiParamsContainer {
    cookieManager = null;

    constructor(url, cookie) {
        super(url);
        this.cookieManager = cookie;
    }

    getLocationId() {
        const user = this.getUser();
        if (user && user.location_id) {
            return user.location_id;
        }
        return this.cookieManager.get(LOCATION_ID)
    }

    getToken() {
        return this.cookieManager.get(TOKEN)
    }
}
