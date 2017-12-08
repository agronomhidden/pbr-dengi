import {Record} from 'immutable'

export const UserRecord = Record({
    first_name: null,
    last_name: null,
    phone: null,
});

export const CategoriesRecord = Record({
    id: null,
    name: null,
    is_category: false,
    img: null

})