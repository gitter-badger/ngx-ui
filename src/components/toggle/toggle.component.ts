import {
  Component, Input, Output, EventEmitter, HostBinding, forwardRef, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const TOGGLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleComponent),
  multi: true
};

let nextId = 0;

@Component({
  selector: 'ngx-toggle',
  template: `
    <div>
      <input
        #input
        class="ngx-toggle-input"
        type="checkbox"
        [id]="id"
        [(ngModel)]="value"
        [required]="required"
        [tabIndex]="tabIndex"
        [disabled]="disabled"
        [name]="name"
        (blur)="onBlur()"
        (change)="onChange($event)"
      />
      <label [attr.for]="id" class="ngx-toggle-label">
      </label>
      <label [attr.for]="id" class="ngx-toggle-text">
        <span *ngIf="label" [innerHTML]="label"></span>
        <ng-content></ng-content>
      </label>
    </div>
  `,
  styles: [require('./toggle.component.scss')],
  encapsulation: ViewEncapsulation.None,
  providers: [TOGGLE_VALUE_ACCESSOR]
})
export class ToggleComponent implements ControlValueAccessor {

  @Input() id: string = `input-${++nextId}`;
  @Input() name: string = null;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() tabIndex: number = 0;
  @Input() label: string;

  get value(): boolean {
    return this._value;
  }

  set value(value) {
    if (this.value !== value) {
      this._value = value;
      this.onChangeCallback(this._value);
    }
  }

  @Output() change = new EventEmitter();

  @HostBinding('class')
  private get getHostCssClasses(): string {
    return 'ngx-toggle';
  }

  @HostBinding('class.disabled')
  private get getDisabled(): string {
    return this.disabled ? 'disabled' : '';
  }

  private _value: boolean = false;

  toggle(): void {
    this.value = !this.value;
  }

  onBlur(event): void {
    this.onTouchedCallback();
  }

  onChange(event): void {
    this.toggle();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private onTouchedCallback = () => {
    // placeholder
  }

  private onChangeCallback = (_: any) => {
    // placeholder
  }

}
