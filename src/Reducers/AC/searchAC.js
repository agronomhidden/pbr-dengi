import {SEARCH_EVENT} from '../../CONSTANTS';

export const search = data => ({
    type: SEARCH_EVENT,
    payload: data,
    toQueryString: true,
})


