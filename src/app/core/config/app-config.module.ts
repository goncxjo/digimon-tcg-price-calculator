import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigService } from './app-config.service';


function AppConfigFactory(config: AppConfigService) {
  return () => config.load();
}
function EnvironmentNameFactory(config: AppConfigService) {
  return config.get().ENVIRONMENT_NAME;
}
function AppVersionFactory(config: AppConfigService) {
  return config.get().appVersion;
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
      provide: "ENVIRONMENT_NAME",
      useFactory: EnvironmentNameFactory,
      deps: [AppConfigService],
    },
    { provide: "APP_VERSION",
      useFactory: AppVersionFactory,
      deps: [AppConfigService],
    }
  ]
})
export class AppConfigModule { }
