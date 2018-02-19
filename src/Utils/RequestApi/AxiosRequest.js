import axios from "axios"
import ErrorHandler from "../ErrorHandler"
import RequestBuilder from "./RequestBuilder"


export class AxiosRequest extends RequestBuilder {


    getRequest() {
        return this.prepareAxios().Axios.get(this.url, {params: this.Args})
            .then(res => {
                return res
            })
            .catch(err => {
                ErrorHandler.onError(err)
            })
    }

    postRequest() {

        return this.prepareAxios().Axios.post(this.url, this.Args)
            .then(res => {
                this.cleanParams()
                return res
            })
            .catch(err => {
                ErrorHandler.onError(err.response)
                return err
            })
    }

    prepareAxios() {
        this.validateParams()

        if (this.baseURL) {
            axios.defaults.baseURL = this.baseURL
        }
        if (this.header) {
            axios.defaults.headers.common = this.header
        }
        return this
    }

    get Axios(){
        return axios
    }

}

