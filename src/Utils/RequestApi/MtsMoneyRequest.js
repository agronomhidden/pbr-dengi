import {LOCATIONID, TOKEN} from "../../CONSTANTS"
import {AxiosRequest} from "./AxiosRequest"


class MtsMoneyRequest extends AxiosRequest {

    /** @var string method */
    method

    /** @var string location */
    location

    setMethod(method) {
        this.method = method
        return this
    }

    setLocation(location) {
        this.location = location
        return this
    }

    withLocation(){
        if(this.location) {
            this.params[LOCATIONID] = this.location
        }
        return this
    }

    cleanParams() {
        this.header = {}
        this.method = ''
        this.params = {}
        return this
    }

    get Args() {
        if (this.token) {
            this.params = Object.assign(this.params, this.token)
        }
        if (this.method) {
            return {
                method: this.method,
                args: this.params
            }
        }
        return this.params
    }

}

export default new MtsMoneyRequest


