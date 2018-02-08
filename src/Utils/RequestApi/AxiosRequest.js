import axios from "axios/index"
import ErrorHandler from "../ErrorHandler"
import RequestBuilder from "./RequestBuilder"


export class AxiosRequest extends RequestBuilder {


    getRequest() {
        this.prepareAxios()
        console.log(this.Args);
        return axios.get(this.url, {params:this.Args})
            .then(res => {
                this.cleanParams()
                return res
            })
            .catch(err => {
                console.log(err);
                ErrorHandler.onError(err)
            })
    }

    postRequest() {
        this.prepareAxios()
        return axios.post(this.url, this.Args)
            .then(res => {
                this.cleanParams()
                return res
            })
            .catch(err => {
                ErrorHandler.onError(err)
            })
    }

    prepareAxios(){
        if(this.baseURL) {
            axios.defaults.baseURL = this.baseURL
        }
        if(this.header){
            axios.defaults.headers.common = this.header
        }
    }

}

