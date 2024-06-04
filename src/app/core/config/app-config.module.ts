import { APP_INITIALIZER, EnvironmentProviders, NgModule, makeEnvironmentProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigService } from './app-config.service';


export function initializeApplicationConfig(): EnvironmentProviders {
  return makeEnvironmentProviders([
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
    },
    { provide: "CRYPTO_SECRET_KEY",
      useFactory: CryptoSecretKeyFactory,
      deps: [AppConfigService],
    }
  ]);
}

export function AppConfigFactory(config: AppConfigService) {
  return () => config.load();
}
function EnvironmentNameFactory(config: AppConfigService) {
  return () => config.get().ENVIRONMENT_NAME;
}
function AppVersionFactory(config: AppConfigService) {
  return () => config.get().appVersion
}
function CryptoSecretKeyFactory(config: AppConfigService) {
  return () => config.get().CRYPTO_SECRET_KEY;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AppConfigService,

  ]
})
export class AppConfigModule { }
