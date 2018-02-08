import {setErrors} from '../Reducers/AC/commonAC'

class ErrorHandler {

    /** @var {setErrors} Обработчик ошибок по умолчанию*/
    handler = setErrors

    /** @var function Диспечер текущего store */
    dispatch

    setHandler(handler){
        this.handler = handler
        return this
    }

    setDispatcher(dispatch){
        this.dispatch = dispatch
        return this
    }

     onError = (err) => {
         const {handler, dispatch} = this

         if(err.response) {
             dispatch(handler(err.response.data))
         }
    }

}

export default new ErrorHandler()