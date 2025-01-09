

import { ComponentFixture, TestBed } from "@angular/core/testing";
import CalculatorViewComponent from "./calculator-view.component";

describe('CalculatorViewComponent', () => {
    let fixture: ComponentFixture<CalculatorViewComponent>;
    let compiled: HTMLElement;
    let component: CalculatorViewComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalculatorViewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CalculatorViewComponent);
        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {        
        expect(component).toBeTruthy();
    });

    it((`should contain calculator component`), () => {
        const calculatorElement = compiled.querySelector('calculator');
        expect(calculatorElement).toBeTruthy();
    });

    it('should contain basic css classes', () => { 
        const divElement = compiled.querySelector('div');
        const shouldHave = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');
        shouldHave.forEach((className) => {
            expect(divElement?.classList.contains(className)).toBeTruthy();
        });
    });

});
