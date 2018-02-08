import {TOKEN} from "../../CONSTANTS"
import {AxiosRequest} from "./AxiosRequest"

class MtsMoneyRequest extends AxiosRequest {


    /** @var string method */
    method


    setMethod(method) {
        this.method = method
        return this
    }

    cleanParams() {
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


