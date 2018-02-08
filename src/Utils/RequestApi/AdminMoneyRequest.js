import {AxiosRequest} from "./AxiosRequest"

export default new class AdminMoneyRequest extends AxiosRequest {

    get Args() {
        if (this.token) {
            this.params = Object.assign(this.params, this.token)
        }
        return this.params
    }

}