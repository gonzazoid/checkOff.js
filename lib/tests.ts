declare var describe: Mocha.IContextDefinition;

import { expect } from 'chai';
import {checkOff} from './index';

describe('checkOff', function(){

    const obj = { some   : {prop:{}}
                , string_prop: 'some sring'
                , not_string_prop: 42
                , stringObjectProp: new String('some string')

                , num_prop: 17
                , not_num_prop: '0'
                , numObjectProp: new Number(42)

                , boolean_prop: true
                , not_boolean_prop: 0
                , booleanObjectProp: new Boolean(true)

                , symbol_prop: Symbol()
                , not_symbol_prop: ''

                , function_prop: function(){ /* */ }
                , arrow_function_prop: () => { /*  */}
                , functionObjectProp: new Function('', 'alert(a)')
                , not_function_prop: 42

                , array_prop: ['', {nested: {prop: {}}}, ''] as any[]
                , string_typed_array: ['', 'haha', 'hohoh']
                , number_typed_array: [0, 17, 42]
                , boolean_typed_array: [true, false, !0]
                , symbol_typed_array: [Symbol(), Symbol(), Symbol()]
                , function_typed_array: [()=>{/* */}, ()=>{/* */}, ()=>{/* */}]
                , array_typed_array: [[] as any, [] as any, [] as any]

                , complex_array_prop: ['', {nested: {prop: {}}}, 42, Symbol(), ()=>{/* */}, ['', '']] as any[]
                };

    describe('any:', function(){

        it('check any (null) (false negative): string_prop', (testDone) => {
            expect(checkOff(obj, {string_prop: null})).to.eql(true);
            testDone();
        });

        it('check any (null) (false negative): boolean_prop', (testDone) => {
            expect(checkOff(obj, {boolean_prop: null})).to.eql(true);
            testDone();
        });

        it('check any (null) (false negative): num_prop', (testDone) => {
            expect(checkOff(obj, {num_prop: null})).to.eql(true);
            testDone();
        });

        it('check any (null) (false negative): symbol_prop', (testDone) => {
            expect(checkOff(obj, {symbol_prop: null})).to.eql(true);
            testDone();
        });

        it('check any (null) (false negative): function_prop', (testDone) => {
            expect(checkOff(obj, {function_prop: null})).to.eql(true);
            testDone();
        });

        it('check any (null) (false negative): array_prop', (testDone) => {
            expect(checkOff(obj, {array_prop: null})).to.eql(true);
            testDone();
        });

        it('check any (null) (false positive): undefined prop', (testDone) => {
            expect(checkOff(obj, {undefined_prop: null})).to.eql(false);
            testDone();
        });
    });

    describe('strings:', function(){
        it('check string literal (false negative): string_prop', (testDone) => {
            expect(checkOff(obj, {string_prop: ''})).to.eql(true);
            testDone();
        });

        it('check string literal (false positive): not_string_prop', (testDone) => {
            expect(checkOff(obj, {not_string_prop: ''})).to.eql(false);
            testDone();
        });

        it('check String object (false positive): stringObjectProp', (testDone) => {
            expect(checkOff(obj, {stringObjectProp: ''})).to.eql(false);
            testDone();
        });

        it('check string literal (false positive): undefined prop', (testDone) => {
            expect(checkOff(obj, {undefined_prop: ''})).to.eql(false);
            testDone();
        });
    });

    describe('numbers:', function(){
        it('check number literal (false negative): num_prop', (testDone) => {
            expect(checkOff(obj, {num_prop: 0})).to.eql(true);
            testDone();
        });

        it('check number literal (false positive): not_num_prop', (testDone) => {
            expect(checkOff(obj, {not_num_prop: 0})).to.eql(false);
            testDone();
        });

        it('check Number object (false positive): numObjectProp', (testDone) => {
            expect(checkOff(obj, {numObjectProp: 42})).to.eql(false);
            testDone();
        });

        it('check number literal (false positive): undefined prop', (testDone) => {
            expect(checkOff(obj, {undefined_prop: 0})).to.eql(false);
            testDone();
        });
    });

    describe('booleans:', function(){
        it('check boolean literal (false negative): boolean_prop', (testDone) => {
            expect(checkOff(obj, {boolean_prop: !1})).to.eql(true);
            testDone();
        });

        it('check boolean literal (false positive): not_boolean_prop', (testDone) => {
            expect(checkOff(obj, {not_boolean_prop: !1})).to.eql(false);
            testDone();
        });

        it('check Boolean object (false positive): booleanObjectProp', (testDone) => {
            expect(checkOff(obj, {booleanObjectProp: true})).to.eql(false);
            testDone();
        });

        it('check boolean literal (false positive): undefined prop', (testDone) => {
            expect(checkOff(obj, {undefined_prop: !0})).to.eql(false);
            testDone();
        });
    });

    describe('symbols:', function(){
        it('check symbol literal (false negative): symbol_prop', (testDone) => {
            expect(checkOff(obj, {symbol_prop: Symbol()})).to.eql(true);
            testDone();
        });

        it('check symbol literal (false positive): not_symbol_prop', (testDone) => {
            expect(checkOff(obj, {not_symbol_prop: Symbol()})).to.eql(false);
            testDone();
        });

        it('PAY ATTENTION!!! there is no Symbol objects - new Symbol() throws exception', (testDone) => {
            expect(true).to.eql(true);
            testDone();
        });

        it('check symbol literal (false positive): undefined prop', (testDone) => {
            expect(checkOff(obj, {undefined_prop: Symbol()})).to.eql(false);
            testDone();
        });
    });

    describe('functions:', function(){
        it('check function (false negative): function_prop', (testDone) => {
            expect(checkOff(obj, {function_prop: ()=>{/* */}})).to.eql(true);
            testDone();
        });

        it('check function (false negative): arrow_function_prop', (testDone) => {
            expect(checkOff(obj, {function_prop: ()=>{/* */}})).to.eql(true);
            testDone();
        });
        it('check function (false positive): not_function_prop', (testDone) => {
            expect(checkOff(obj, {not_function_prop: ()=>{/* */}})).to.eql(false);
            testDone();
        });

        it('check Function object (false negative): functionObjectProp PAY ATTENTION!!! new Function() return function, not Object', (testDone) => {
            expect(checkOff(obj, {functionObjectProp: ()=>{/* */}})).to.eql(true);
            testDone();
        });

        it('check function (false positive): undefined prop', (testDone) => {
            expect(checkOff(obj, {undefined_prop: ()=>{/* */}})).to.eql(false);
            testDone();
        });
    });

    describe('arrays:', function(){
        it('check array (false negative): array_prop', (testDone) => {
            expect(checkOff(obj, {array_prop: []})).to.eql(true);
            testDone();
        });

        it('check typed array: string (false negative): string_typed_array', (testDone) => {
            expect(checkOff(obj, {string_typed_array: ['']})).to.eql(true);
            testDone();
        });

        it('check typed array: string (false positive): string_typed_array', (testDone) => {
            expect(checkOff(obj, {string_typed_array: [0]})).to.eql(false);
            testDone();
        });

        it('check typed array: string, complex rule (false negative): string_typed_array', (testDone) => {
            expect(checkOff(obj, {string_typed_array: [0, '']})).to.eql(true);
            testDone();
        });

        it('check typed array: number (false negative): number_typed_array', (testDone) => {
            expect(checkOff(obj, {number_typed_array: [0]})).to.eql(true);
            testDone();
        });

        it('check typed array: number (false positive): number_typed_array', (testDone) => {
            expect(checkOff(obj, {number_typed_array: ['']})).to.eql(false);
            testDone();
        });

        it('check typed array: number, complex rule (false negative): number_typed_array', (testDone) => {
            expect(checkOff(obj, {number_typed_array: ['', 0]})).to.eql(true);
            testDone();
        });

        it('check typed array: boolean (false negative): boolean_typed_array', (testDone) => {
            expect(checkOff(obj, {boolean_typed_array: [!0]})).to.eql(true);
            testDone();
        });

        it('check typed array: boolean (false positive): boolean_typed_array', (testDone) => {
            expect(checkOff(obj, {boolean_typed_array: ['', 0]})).to.eql(false);
            testDone();
        });

        it('check typed array: boolean, complex rule (false negative): boolean_typed_array', (testDone) => {
            expect(checkOff(obj, {boolean_typed_array: ['', !0]})).to.eql(true);
            testDone();
        });

        it('check typed array: symbol (false negative): symbol_typed_array', (testDone) => {
            expect(checkOff(obj, {symbol_typed_array: [Symbol()]})).to.eql(true);
            testDone();
        });

        it('check typed array: symbol (false positive): symbol_typed_array', (testDone) => {
            expect(checkOff(obj, {symbol_typed_array: ['', 0]})).to.eql(false);
            testDone();
        });

        it('check typed array: symbol, complex rule (false negative): symbol_typed_array', (testDone) => {
            expect(checkOff(obj, {symbol_typed_array: ['', !0, Symbol()]})).to.eql(true);
            testDone();
        });

        it('check typed array: function (false negative): function_typed_array', (testDone) => {
            expect(checkOff(obj, {function_typed_array: [()=>{/* */}]})).to.eql(true);
            testDone();
        });

        it('check typed array: function (false positive): function_typed_array', (testDone) => {
            expect(checkOff(obj, {symbol_typed_array: ['', 0, false]})).to.eql(false);
            testDone();
        });

        it('check typed array: function, complex rule (false negative): function_typed_array', (testDone) => {
            expect(checkOff(obj, {function_typed_array: ['', !0, Symbol(), ()=>{/* */}]})).to.eql(true);
            testDone();
        });

        it('check typed array: array (false negative): array_typed_array', (testDone) => {
            expect(checkOff(obj, {array_typed_array: [[]]})).to.eql(true);
            testDone();
        });

        it('check typed array: array (false positive): function_typed_array', (testDone) => {
            expect(checkOff(obj, {array_typed_array: ['', 0, false]})).to.eql(false);
            testDone();
        });

        it('check typed array: array, complex rule (false positive): function_typed_array', (testDone) => {
            expect(checkOff(obj, {array_typed_array: ['', !0, Symbol(), ()=>{/* */}]})).to.eql(false);
            testDone();
        });

        it('check typed array: array, complex rule (false negative): function_typed_array', (testDone) => {
            expect(checkOff(obj, {array_typed_array: ['', !0, Symbol(), ()=>{/* */}, []]})).to.eql(true);
            testDone();
        });
    });

    describe('complex checks:', function(){
        it('object: ["", {nested: {prop: {}}}, 42, Symbol(), ()=>{}, ["", ""]] rule: ["", 0, {}, Symbol(), ()=>{}, [""]]', (testDone) => {
            expect(checkOff(obj, {complex_array_prop: ['', 0, {}, Symbol(), ()=>{/* */}, ['']]})).to.eql(true);
            testDone();
        });
    });
});
