import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {MatAutocompleteModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
// import { AutocompleteComponent } from './autocomplete/autocomplete.component';
// import { ServersComponent } from './servers/servers.component';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test/test';
// import { ChartModule } from 'angular-highcharts';

// import {WebStorageModule, BROWSER_STORAGE_PROVIDERS} from 'h5webstorage';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
    // ServersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NoopAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    HttpClientModule,
    // WebStorageModule
    // ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
