import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {getLocation} from '../src/Reducers/Requests/locationRequest'
import * as types from '../src/CONSTANTS'
import moxios from 'moxios';
import expect from 'expect'

const mockStore = configureMockStore([thunk])

describe('async actions', () => {


    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });


    it('Получение локаций', () => {

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {result: {res: 'locationObject'}}
            });
        })

        const expectedActions = [
            {type: types.SET_LOCATION + types.START},
            {type: types.SET_LOCATION + types.SUCCESS, payload: {res: 'locationObject'}}
        ]
        const store = mockStore({location: {}})

        return store.dispatch(getLocation()).then((response, url, opts) => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})