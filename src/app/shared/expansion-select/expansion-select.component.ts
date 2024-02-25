import { AfterViewInit, Component, DoCheck, forwardRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { TcgPlayerService } from 'src/app/backend';
import { ExpansionTcgPlayer } from 'src/app/backend/models/tcg-player';

@Component({
  selector: 'app-expansion-select',
  templateUrl: './expansion-select.component.html',
  styleUrls: ['./expansion-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExpansionSelectComponent),
      multi: true
    },
  ]
})
export class ExpansionSelectComponent implements OnInit, ControlValueAccessor, DoCheck, AfterViewInit {
  value!: ExpansionTcgPlayer | null;
  control!: NgControl;
  isDisabled!: boolean;

  @Input() mostrarOpcionTodos: boolean = true;

  data$: Observable<ExpansionTcgPlayer[]> = this.tcgPlayerService.getDigimonExpansions();

  @ViewChild('input', { static: false, read: NgControl }) input: any;

  onChange = (_: any) => { }
  onTouch = () => { }

  constructor(
    private injector: Injector,
    private tcgPlayerService: TcgPlayerService
  ) {
    this.value = null;
   }

  ngDoCheck(): void {
    if (this.input && this.control) {
      if (this.control.touched) {
        this.input.control.markAsTouched();
      } else {
        this.input.control.markAsUntouched();
      }
    }
  }

  ngAfterViewInit() {
    if (this.control != null) {
      this.input.control.setValidators(this.control.control?.validator);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: ExpansionTcgPlayer): void {
    this.value = value;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
    this.control = this.injector.get(NgControl);
  }

  onModelChange(_event: any) {
    this.notifyValueChange();
  }

  notifyValueChange() {
    if (this.onChange) {
      this.onChange(this.value);
    }

    if (this.onTouch) {
      this.onTouch();
    }
  }

  compareSelectedValue(item: ExpansionTcgPlayer, value: ExpansionTcgPlayer) {
    return (!item || !value) ? false : item.setNameId === value.setNameId;
  }
}
