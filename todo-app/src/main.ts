import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  provideRemoteConfig,
  getRemoteConfig,
} from '@angular/fire/remote-config';
import { environment } from './environments/environment';

const startApp = () => {
  bootstrapApplication(AppComponent, {
    providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      provideIonicAngular(),
      importProvidersFrom(IonicStorageModule.forRoot()),
      provideRouter(routes, withPreloading(PreloadAllModules)),
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideRemoteConfig(() => getRemoteConfig()),
    ],
  });
};

if ((window as any).cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
