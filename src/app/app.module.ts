import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// components
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

// services
import { MainService } from './main/main.service';
import { D3Service, D3_DIRECTIVES } from './d3';

import { SHARED_VISUALS } from './visuals/shared';

@NgModule({
  declarations: [
    AppComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    MainService,
    D3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
