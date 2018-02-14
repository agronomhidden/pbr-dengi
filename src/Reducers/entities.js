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
    top: null,
    is_service: false
})

export const DialogFieldsRecord = Record({
    description: null,
    name: null,
    type: null,
    maxLength: null,
    minLength: null,
    min: null,
    max: null,
    hint: null,
    format: null,
    value: null,
    originalField: null,
    isSum: null,
    nominal: null,
    editable: null,
    placeholder: null,
    mask: null,
    required: null
})

export const CitiesRecord = Record({
    id: null,
    name: null,
    parent_id: null
})

export const RegionsRecord = Record({
    id: null,
    name: null
})

export const payHistoryRecord = Record({
    id: null,
    item_name: null,
    transaction_uuid: null,
    key: null,
    service: null,
    status: null,
    method: null,
    total_sum: null,
    user: null,
    sum: null,
    commission: null,
    currency: null,
    date_create: null,
    date_pay: null,
    img: null,
    fields: null,
    category_name: null,
    erip_data: null,
    server_time: null,

})