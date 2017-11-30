import {setMessage,loadMessage} from '../AC/messageAC';


export const setMess = () =>
    dispatch => {
        dispatch(setMessage())
    }

export const loadMess = () =>
    dispatch => {
        dispatch(loadMessage())
    }