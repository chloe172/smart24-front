import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessSessionComponent } from './access-session/access-session.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    AppComponent,
    AccessSessionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
