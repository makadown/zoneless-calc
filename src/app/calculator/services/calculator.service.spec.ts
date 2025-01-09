
import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";

describe('CalculatorService', () => {
    let service: CalculatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalculatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be created with default values', () => {
        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0'); 
        expect(service.lastOperator()).toBe('+'); 
    });

    it ('should set resultTest to "0" when C is pressed', () => { 
        service.resultText.set('10');
        service.subResultText.set('20');
        service.lastOperator.set('*');

        service.constructNumber('C');

        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0'); 
        expect(service.lastOperator()).toBe('+');
    });

    it(`should update resultText with number input`, () => {
        service.constructNumber('1');
        expect(service.resultText()).toBe('1');

        service.constructNumber('2');
        expect(service.resultText()).toBe('12');
    });

    it(`should handle operators correctly`, () => {
        service.constructNumber('1');
        service.constructNumber('-');

        expect(service.lastOperator()).toBe('-');
        expect(service.subResultText()).toBe('1');
        expect(service.resultText()).toBe('0');
    });

    it(`should calculate result correctly for addition`, () => {
        service.constructNumber('1');
        service.constructNumber('+');
        service.constructNumber('2');
        service.constructNumber('0');
        service.constructNumber('=');

        expect(service.resultText()).toBe('21');
    });

    it(`should calculate result correctly for subtraction`, () => {
        service.constructNumber('1');
        service.constructNumber('-');
        service.constructNumber('2');
        service.constructNumber('0');
        service.constructNumber('=');

        expect(service.resultText()).toBe('-19');
    });

    it(`should calculate result correctly for multiplication`, () => {
        service.constructNumber('2');
        service.constructNumber('*');
        service.constructNumber('2');
        service.constructNumber('0');
        service.constructNumber('=');

        expect(service.resultText()).toBe('40');
    });

    it(`should calculate result correctly for division`, () => {
        service.constructNumber('1');
        service.constructNumber('/');
        service.constructNumber('2');
        service.constructNumber('=');

        expect(service.resultText()).toBe('0.5');
    });

    it(`should handle decimal point correctly`, () => {
        service.constructNumber('1');
        service.constructNumber('.');
        service.constructNumber('2');

        expect(service.resultText()).toBe('1.2');
        service.constructNumber('.');
        expect(service.resultText()).toBe('1.2');
    });

    it(`should handle decimal point correctly starting with zero`, () => {
        service.constructNumber('0');
        service.constructNumber('.');
        service.constructNumber('.');
        service.constructNumber('.');
        service.constructNumber('0');

        expect(service.resultText()).toBe('0.0');
        service.constructNumber('0');
        expect(service.resultText()).toBe('0.00');
    });

    it(`should handle sign change correctly`, () => {
        service.constructNumber('1');
        service.constructNumber('+/-');
        expect(service.resultText()).toBe('-1');
        service.constructNumber('+/-');
        expect(service.resultText()).toBe('1');
    });

    it(`should handle backspace correctly`, () => {
        service.resultText.set('123');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('12');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('1');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('0');
    });

    it(`should handle max length correctly`, () => {
        service.constructNumber('1');
        service.constructNumber('2');
        service.constructNumber('3');
        service.constructNumber('4');
        service.constructNumber('5');
        service.constructNumber('6');
        service.constructNumber('7');
        service.constructNumber('8');
        service.constructNumber('9');
        service.constructNumber('0');

        expect(service.resultText()).toBe('1234567890');
        
        service.constructNumber('1');
        expect(service.resultText()).toBe('1234567890');
    });

});
