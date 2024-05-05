import { AfterViewInit, Component, DoCheck, forwardRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ListItem } from 'src/app/backend/models/list-item';

@Component({
  selector: 'app-card-sort-select',
  templateUrl: './card-sort-select.component.html',
  styleUrls: ['./card-sort-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CardSortSelectComponent),
      multi: true
    },
  ]
})
export class CardSortSelectComponent implements OnInit, ControlValueAccessor, DoCheck, AfterViewInit {
  value!: ListItem;
  control!: NgControl;
  isDisabled!: boolean;

  @Input() innerLabel: string = "";
  @Input() mostrarOpcionTodos: boolean = false;

  data$: ListItem[] = [];

  @ViewChild('input', { static: false, read: NgControl }) input: any;

  onChange = (_: any) => { }
  onTouch = () => { }

  constructor(
    private injector: Injector,
  ) { }

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

  writeValue(value: ListItem): void {
    this.value = value;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
    this.getCardSortBy().subscribe(data => {
      this.data$ = data;
    });
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

  compareSelectedValue(item: ListItem, value: ListItem) {
    return (!item || !value) ? false : item.id === value.id;
  }

  getCardSortBy(): Observable<ListItem[]> {
    return of([
      { id: "category", name: "Categoría" },
      { id: "code", name: "Código" },
      { id: "price_unit", name: "Precio unidad" },
      { id: "price_total", name: "Precio Total" },
    ]);
  }

}
