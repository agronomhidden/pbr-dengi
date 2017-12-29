import expect from 'expect';
import ReactTestUtils from 'react-dom/test-utils';
import {formatPhone, setStateOfProps} from '../Utils/helper';
import assert from 'assert';

describe('formatPhone', () => {

    it('telefon is true', () => {

        const phone = formatPhone('123456789013')
        const newPhone = '+123 (45)-678-9013';
        expect(phone).toEqual(newPhone);
    })

});

describe('setState', () => {

    it('set empty state of props with key', () => {

        const props = {
            "name": "Абонентский номер телефона",
            "type": "S",
            "editable": true,
            "minLength": 9,
            "maxLength": 9,
            "originalField": true,
            "mask": null,
            "description": "Абонентский номер телефона",
            "required": true
        }

        const state = setStateOfProps(props, 'name')
        const newState = {'Абонентский номер телефона': ''};
        expect(state).toEqual(newState);
    })

    it('set empty state of props', () => {

        const props = {
            "name": "Абонентский номер телефона",
            "type": "S",
            "editable": true,
            "minLength": 9,
            "maxLength": 9,
            "originalField": true,
            "mask": null,
            "description": "Абонентский номер телефона",
            "required": true
        }

        const state = setStateOfProps(props)
        const newState = {
            "name": "",
            "type": "",
            "editable": "",
            "minLength": "",
            "maxLength": "",
            "originalField": "",
            "mask": "",
            "description": "",
            "required": ""
        };
        expect(state).toEqual(newState);
    })

})



