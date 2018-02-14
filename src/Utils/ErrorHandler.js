import {setErrors} from '../Reducers/AC/commonAC'

export default new class ErrorHandler {

    /** @var function Обработчик ошибок по умолчанию*/
    handler = setErrors

    /** @var function Обработчик ошибок формы*/
    fieldsErrorHandler;

    /** @var function Обработчик logout*/
    logoutHandler;


    /** @var function Диспечер текущего store */
    dispatch

    setHandler(handler){
        this.handler = handler
        return this
    }

    setFieldsErrorHandler(fieldsErrorHandler){
        this.fieldsErrorHandler = fieldsErrorHandler
        return this
    }

    setLogoutHandler(logoutHandler){
        this.logoutHandler = logoutHandler
        return this
    }

    setDispatcher(dispatch){
        this.dispatch = dispatch
        return this
    }

     onError = (response) => {
         const {handler, dispatch,fieldsErrorHandler,logoutHandler} = this
         if(fieldsErrorHandler && response && response.status === 499){
             dispatch(fieldsErrorHandler(response.data))
             this.fieldsErrorHandler = null
             return
         }

         if(logoutHandler && response && response.status === 403){
             dispatch(logoutHandler())
             return
         }

         if(response) {
             dispatch(handler(response.data))
         }
    }

}
