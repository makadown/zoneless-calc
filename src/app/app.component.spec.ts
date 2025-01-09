import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent!', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
//    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it ('should be 3', () => {
    // A = Arrange
    const num1 = 1;
    const num2 = 2;

    // A = Act
    const result = num1 + num2;

    // A = Assert
    expect(result).toBe(3);
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    // const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it ('should render router-outlet wrapped with a div with css classes', () => { 
    const divElement = compiled.querySelector('div');
    const cssClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5';
    const mustHaveClasses = cssClasses.split(' ');

    expect(divElement).toBeTruthy();
    mustHaveClasses.forEach(cssClass => {
      expect(divElement?.classList.contains(cssClass)).toBeTruthy();
    });

    expect(divElement?.querySelector('router-outlet')).toBeTruthy();

    // const fixture = TestBed.createComponent(AppComponent);
    // expect(compiled.querySelector('div[router-outlet]')).toBeTruthy();
  });

  it (`should contain the 'Buy me a beer' link`, () => {
  
    const linkElement = compiled.querySelector('a');
    expect(linkElement).toBeTruthy();
    expect(linkElement?.getAttribute('title')).toBe('Buy me a beer');
    expect(linkElement?.getAttribute('href')).toBe('https://www.buymeacoffee.com/scottwindon');
    expect(linkElement?.getAttribute('target')).toBe('_blank');

  });
});
