

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CalculatorButtonComponent } from "./calculator-button.component";

describe('CalculatorButtonComponent', () => {
    let fixture: ComponentFixture<CalculatorButtonComponent>;
    let compiled: HTMLElement;
    let component: CalculatorButtonComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalculatorButtonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CalculatorButtonComponent);
        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {        
        expect(component).toBeTruthy();
    });

    it('should apply w-1/4 when doubleSize is false', () => {
        const hostCssClasses: string[] = compiled.classList.value.split(' ');

        expect(hostCssClasses).toContain('w-1/4');
        expect(component.isDoubleSize()).toBe(false);
    });

    it('should apply w-2/4 when doubleSize is true', () => {
        fixture.componentRef.setInput('isDoubleSize', true);
        fixture.detectChanges();
        const hostCssClasses: string[] = compiled.classList.value.split(' ');

        expect(hostCssClasses).toContain('w-2/4');
        expect(component.isDoubleSize()).toBe(true);
    });

    it('should emit onClick when handleClick is called', () => {
        const onClickSpy = spyOn(component.onClick, 'emit');
        component.handleClick();
        expect(onClickSpy).toHaveBeenCalled();
    });

    it('should set isPressed to true and then false when keyboardPressedStyle is called with a matching key', (done) => {
        component.contentValue()!.nativeElement.innerText = '1';
        component.keyboardPressedStyle('1');
        expect(component.isPressed()).toBe(true);
        setTimeout(async() => {
            expect(component.isPressed()).toBe(false);
            done();
        }, 101);
    });
});
