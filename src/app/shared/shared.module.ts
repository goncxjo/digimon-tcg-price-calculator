import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { ReversePipe } from './reverse.pipe';
import { YesNoSelectComponent } from './yes-no-select/yes-no-select.component';
import { CurrencySelectComponent } from './currency-select/currency-select.component';

const MODULES = [
  CommonModule,
  NgbModule,
  FormsModule,
  ReactiveFormsModule,
  FontAwesomeModule,
]

const PRIVATE_COMPONENTS: any = [
];

const PUBLIC_COMPONENTS: any = [
  ReversePipe,
  YesNoSelectComponent,
  CurrencySelectComponent
];

@NgModule({
  declarations: [
    ...PRIVATE_COMPONENTS,
    ...PUBLIC_COMPONENTS,
  ],
  imports: MODULES,
  exports: [
    MODULES,
    ...PUBLIC_COMPONENTS
  ],
  providers: [DatePipe]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
    library.addIcons(faWhatsapp as IconDefinition);
  }

}
