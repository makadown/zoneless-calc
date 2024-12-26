import {
  ChangeDetectionStrategy, Component, ElementRef, HostBinding,
  input, OnInit,
  output, signal, viewChild, ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
  },
  styleUrls: ['./calculator-button.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent implements OnInit {
  public isPressed = signal(false);
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  });

  // @HostBinding('class.is-command') get commandStyle() {
  //   return this.isCommand();
  // }

  /*@HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }*/

  ngOnInit(): void {

  }

  handleClick() {
    if (!this.contentValue()?.nativeElement) {
      return;
    }

    const value = this.contentValue()!.nativeElement.innerText as string;
    this.onClick.emit(value.trim().toUpperCase());
  }

  public keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return;
    
    const value = this.contentValue()!.nativeElement.innerText as string;

    if(value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => this.isPressed.set(false), 100);
  }
}
