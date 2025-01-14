import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CalculatorComponent } from "./calculator.component";
import { CalculatorService } from "@/calculator/services/calculator.service";


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

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalculatorComponent],
            providers: [{ provide: CalculatorService, useClass: MockCalculatorService }]
        }).compileComponents();

        fixture = TestBed.createComponent(CalculatorComponent);
        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        console.log(compiled);
        expect(component).toBeTruthy();
    });

    it('should containt the current getters', () => {
        expect(component.resultText()).toBe('100.00');
        expect(component.subResultText()).toBe('0');
        expect(component.lastOperator()).toBe('+');
    });

});
