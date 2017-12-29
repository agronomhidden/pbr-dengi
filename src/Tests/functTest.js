import expect from 'expect';
import ReactTestUtils from 'react-dom/test-utils';
import {formatPhone, prepareRequestDialogFields, setStateOfProps} from '../Utils/helper';
import assert from 'assert';

describe('new helper function tests', () => {

    it('prepare Dialog state', () => {

        const dialogFieldState = {
            'Дата выставления': '20.12.2017',
            'Период': '11.2017',
            'Счётчик 1-предыдущ. знач.': '63',
            'Счётчик 1-текущее знач.': '66',
            'Счётчик 2-предыдущ. знач.': '32',
            'Счётчик 2-текущее знач.': '34.5'
        }

        const resultDialogFieldState =
            {
                'fields[Дата выставления]': '20.12.2017',
                'fields[Период]': '11.2017',
                'fields[Счётчик 1-предыдущ. знач.]': '63',
                'fields[Счётчик 1-текущее знач.]': '66',
                'fields[Счётчик 2-предыдущ. знач.]': '32',
                'fields[Счётчик 2-текущее знач.]': '34.5'
            }
        expect(prepareRequestDialogFields(dialogFieldState)).toEqual(resultDialogFieldState)
    })

    it('set empty state of props with key', () => {

        const props = [{
            'name': 'Абонентский телефона',
            'type': 'S',
            'description': 'Абонентский номер телефона',
            'value': null,
            'editable': true,
        }, {
            'name': 'Абонентский номер ',
            'type': 'S',
            'description': 'Абонентский номер телефона',
            'required': true,
            'value': 19,
            'editable': true,
        }, {
            'name': 'номер телефона',
            'type': 'S',
            'editable': true,
            'value': 'string',
            'required': true
        }, {
            'name': 'Абонентский номер телефона',
            'type': 'S',
            'mask': null,
            'value': false,
            'editable': true,
        }]

        const newState = {
            'Абонентский телефона': '',
            "Абонентский номер ": 19,
            "номер телефона": 'string',
            "Абонентский номер телефона": '',
        };
        expect(setStateOfProps(props, 'name')).toEqual(newState);
    })

})



