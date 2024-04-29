import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; // Fixed import
import { AppModule } from './app/app.module';


bootstrapApplication(AppComponent, appConfig)
platformBrowserDynamic().bootstrapModule(AppModule) // Updated code
  .catch((err) => console.error(err));
