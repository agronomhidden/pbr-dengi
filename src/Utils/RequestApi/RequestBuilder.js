import ErrorHandler from "../ErrorHandler"

export default class RequestBuilder {

    /** @var {{tokenName:value}} token */
    token = {}

    /** @var string url */
    url

    /** @var {{}} params */
    params = {}

    /** @var string baseURL */
    baseURL

    /** @var {{}} params */
    header = {}

    setBaseUrl(baseURL) {
        this.baseURL = baseURL
        return this
    }

    setHeader(params = {}) {
        for (let name in params) {
            this.header[name] = params[name]
        }
        return this
    }

    setUrl(url) {
        this.url = url
        return this
    }

    setToken(name, token) {
        if (name && token) {
            this.token[name] = token
        }
        return this
    }

    setParams(params) {
        this.params = params
        return this
    }

    cleanParams() {
        this.params = {}
        return this
    }

    validateParams() {
        for (let param of this.params) {
            if (param === undefined || param === null) {
                ErrorHandler.onError({response: {data: {msg: 'No valid params'}}})
                return false
            }
        }
        return this
    }

    get Args() {
        return this.params
    }
}
