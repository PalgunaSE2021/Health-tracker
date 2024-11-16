import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig = {
  providers: [importProvidersFrom(BrowserAnimationsModule)],
};

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
