import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigService } from './app-config.service';
import { environment } from 'src/environments/environment';


function AppConfigFactory(config: AppConfigService) {
  return () => config.load();
}

function BaseUrlFactory(config: AppConfigService) {
  return config.get().BASE_URL;
}

function EnvironmentNameFactory(config: AppConfigService) {
  return config.get().ENVIRONMENT_NAME;
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: AppConfigFactory,
      deps: [AppConfigService],
      multi: true
    },
    {
      provide: "BASE_URL",
      useFactory: BaseUrlFactory,
      deps: [AppConfigService],
    },
    {
      provide: "ENVIRONMENT_NAME",
      useFactory: EnvironmentNameFactory,
      deps: [AppConfigService],
    },
    { provide: "APP_VERSION", useValue: environment.version }
  ]
})
export class AppConfigModule { }
