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
    identifier_name: null,
    mask: null,
    img: null,
    count: null,
    location: null,
    path: null,
    u_key: null,
    top: null
})
