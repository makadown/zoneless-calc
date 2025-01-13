import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CalculatorButtonComponent } from "./calculator-button.component";
import { Component } from "@angular/core";

@Component({
    standalone: true,
    imports: [CalculatorButtonComponent],
    template: `<calculator-button>
        <span class="projected-content underline">Test content</span>
    </calculator-button>`
})
class TestHostComponent {}

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

    it('should NOT set isPressed to true if key doesnt match', () => {
        component.contentValue()!.nativeElement.innerText = '1';
        component.keyboardPressedStyle('2');
        expect(component.isPressed()).toBe(false);
    });

    it('should display projected content', () => {
       const testHostFixture = TestBed.createComponent(TestHostComponent);
       const compiled = testHostFixture.nativeElement as HTMLElement;
       const projectedContent = compiled.querySelector('.projected-content');
       expect(projectedContent).toBeTruthy();
       expect(projectedContent?.classList.contains('underline')).toBe(true);
    });
});
