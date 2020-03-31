import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DxDataGridModule, DxTemplateModule} from 'devextreme-angular';
import {Service} from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxDataGridModule,
    DxTemplateModule,
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
