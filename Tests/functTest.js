import expect from 'expect';
import {List, Map, OrderedMap} from 'immutable'
import {
    setStateOfPropsForDialog, validateLengthString,
    prepareRequestDialogFields, changeEripDataFormat
} from '../src/Utils/helper';
import {DialogFieldsRecord} from "../src/Reducers/entities"
import {arrToMap} from "pbr-lib-front-utils/dateManipulation"


describe('Test Dialog Function', () => {

    const dialogResponce = [
        {
            "name": "Комиссия",
            "editable": false,
            "type": "I",
            "value": "0 BYR",
            "originalField": true,
            "description": "Комиссия"
        }, {
            "name": "Cумма с учетом комиссии",
            "editable": false,
            "type": "I",
            "value": "30 000 BYR",
            "originalField": true,
            "description": "Cумма с учетом комиссии"
        }, {
            "description": "Сумма (BYR)",
            "value": "",
            "min": "50",
            "name": "sum",
            "type": "R",
            "isSum": true,
            "editable": true,
            "originalField": false,
            "max": 6300000,
            "readonly": false,
            "nominal": "50"
        }, {
            "name": "Абонентский номер",
            "type": "S",
            "description": "Абонентский номер телефона",
            "required": true,
            "value": '',
            "editable": true,
            "minLength": 11,
            "originalField": true,
        }
    ]

    const dialogBlocks = List([
        Map({
            fields: arrToMap(dialogResponce, DialogFieldsRecord, item => item.name),
            summary: '{summary}'
        })])

    const setState = {
        sum: '',
        "Абонентский номер": ''
    }

    const fieldState = {}

    dialogBlocks.forEach(record => {
        Object.assign(fieldState, setStateOfPropsForDialog(record.get('fields').toObject()))
    })

    it('prepare Dialog state', () => {
        expect(fieldState).toEqual(setState)
    })

    const lengthProp = [{
        minLength: 11,
        maxLength: 11,
        result: {error: {name: 'name', text: 'длина значения поля должна быть не менеее 11'}}
    }, {
        maxLength: 5,
        result: {error: {name: 'name', text: 'длина значения поля должна быть не более 5'}}
    }, {
        minLength: 5,
        result: true
    }, {
        result: true
    }]

    for (let prop of lengthProp) {
        it('validate length with ' + prop.result, () => {
            expect(validateLengthString('fieldValue', 'name', prop)).toEqual(prop.result)
        })
    }

    const getState = [{
        sum: 500,
        "Абонентский номер": '6464464'
    }, {
        sum: 650,
        "Абонентский номер": '64644641251'
    }]

    for (let state of getState) {
        const result = state.sum === 500 ? {
            "error": {
                "name": "Абонентский номер",
                "text": "длина значения поля должна быть не менеее 11",
            }
        } : {"fields[Абонентский номер]": '64644641251', sum: 650}
        it('prepare Dialog Fields', () => {
            expect(prepareRequestDialogFields(state, dialogBlocks)).toEqual(result)
        })
    }

    it('Data formater', () => {
        expect(changeEripDataFormat('YYMM')).toEqual('ymm')
    })



})



