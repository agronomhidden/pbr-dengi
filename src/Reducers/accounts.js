import {Record, OrderedMap} from 'immutable'
import {arrToMap} from 'pbr-lib-front-utils/dateManipulation'

const ReducerState = Record({
    slider: new OrderedMap({}),
    //count_services: null,
    //categories: new OrderedMap({}),
    //targetCategoryPath: new OrderedMap({}),
    // searchValue: '',
    // loading: false,
    // autoCompleteDetected: [],
    // autoCompleteLoading: false,
    // autoCompleteWorks: false,
})

export default (state = new ReducerState(), action = {}) => {

    switch (action.type) {

    }
}