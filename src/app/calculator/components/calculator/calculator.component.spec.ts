import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CalculatorComponent } from "./calculator.component";
import { CalculatorService } from "@/calculator/services/calculator.service";
import { By } from "@angular/platform-browser";
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";


class MockCalculatorService {
    public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
    public subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
    public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

    public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
    let fixture: ComponentFixture<CalculatorComponent>;
    let compiled: HTMLElement;
    let component: CalculatorComponent;

    let mockCalculatorService: MockCalculatorService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalculatorComponent],
            providers: [{ provide: CalculatorService, useClass: MockCalculatorService }]
        }).compileComponents();

        fixture = TestBed.createComponent(CalculatorComponent);
        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;

        mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;

        // fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should containt the current getters', () => {
        expect(component.resultText()).toBe('100.00');
        expect(component.subResultText()).toBe('0');
        expect(component.lastOperator()).toBe('+');
    });

    it('should display proper calculation values', () => {
        mockCalculatorService.resultText.and.returnValue('123');
        mockCalculatorService.subResultText.and.returnValue('456');
        mockCalculatorService.lastOperator.and.returnValue('*');
        fixture.detectChanges();

        expect(compiled.querySelector('span')?.innerText).toBe('456 *');
        expect(component.resultText()).toBe('123');
        expect(component.subResultText()).toBe('456');
        expect(component.lastOperator()).toBe('*');
    });

    it('should have 19 calculator-button components (from viewChildren)', () => {
        expect(component.calculatorButtons).toBeTruthy();
        expect(component.calculatorButtons().length).toBe(19);
    });

    it('should have 19 calculator-button components with content projection', () => {
        const buttonsByDirective = fixture.debugElement.queryAll(By.directive(CalculatorButtonComponent));
        expect(buttonsByDirective.length).toBe(19);

        const buttons = compiled.querySelectorAll('calculator-button');
        expect(buttons.length).toBe(19);

        // Evaluate each button content
        expect(buttons[0].textContent).toBe('C');
        expect(buttons[1].textContent).toBe('+/-');
        expect(buttons[2].textContent).toBe('%');
        expect(buttons[3].textContent).toBe('÷');
        expect(buttons[4].textContent).toBe('7');
        expect(buttons[5].textContent).toBe('8');
        expect(buttons[6].textContent).toBe('9');
        expect(buttons[7].textContent).toBe('⨉');
        expect(buttons[8].textContent).toBe('4');
        expect(buttons[9].textContent).toBe('5');
        expect(buttons[10].textContent).toBe('6');
        expect(buttons[11].textContent).toBe('-');
        expect(buttons[12].textContent).toBe('1');
        expect(buttons[13].textContent).toBe('2');
        expect(buttons[14].textContent).toBe('3');
        expect(buttons[15].textContent).toBe('+');
        expect(buttons[16].textContent).toBe('0');
        expect(buttons[17].textContent).toBe('.');
        expect(buttons[18].textContent).toBe('=');        
    });

    it('should handle keyboard events correctly', () => {
        const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
        document.dispatchEvent(eventEnter);
        expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');
        
        const eventESC = new KeyboardEvent('keyup', { key: 'Escape' });
        document.dispatchEvent(eventESC);
        expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
    });

    it('should display result text correctly', () => {
        mockCalculatorService.resultText.and.returnValue('123');
        mockCalculatorService.subResultText.and.returnValue('10');
        mockCalculatorService.lastOperator.and.returnValue('-');
        fixture.detectChanges();
        expect(component.resultText()).toBe('123');
        expect(compiled.querySelector('#sub-result')?.textContent?.trim()).toBe('10 -');
    });

});
