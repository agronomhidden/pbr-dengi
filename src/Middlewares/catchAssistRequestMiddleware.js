import {GET_RECHARGE_REQUIREMENT, RECHARGE_INFO, SET_ASSIST_PARAMS, START} from '../CONSTANTS'
import {getHistoryItems} from "../Reducers/AC/payHistoryAC"
import is from 'is_js';

export default history => store => next => action => {
    switch (action.type) {
        case GET_RECHARGE_REQUIREMENT + START :
            const {transaction_uuids} = history.match.params;
            const params = {
                transaction_uuids,
                withNew: 1
            }
            store.dispatch(getHistoryItems(params))
            break
        case SET_ASSIST_PARAMS:
            if (is.not.undefined(document)) {
                const form = document.createElement('form');
                form.action = action.payload.assist_url;
                form.method = 'POST';
                for (let name in action.payload.data) {
                    const input = document.createElement('input');
                    input.name = name;
                    input.value = action.payload.data[name];
                    if (name === 'URL_RETURN_OK') {
                        input.value = process.env[name]
                    }
                    if (name === 'URL_RETURN_NO') {
                        input.value = process.env[name]
                    }
                    form.appendChild(input);
                }
                document.body.appendChild(form);
                form.submit();
                return;
            }
            break

    }

    return next(action)
}