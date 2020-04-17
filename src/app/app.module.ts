import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChartsModule} from 'ng2-charts';
import {ChartComponent} from './chart/chart.component';
import {BenchmarkService} from './core/benchmark.service';
import {HttpClientModule} from '@angular/common/http';
import {BenchmarkComponent} from './benchmark/benchmark.component';
import {FormsModule} from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    BenchmarkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  providers: [
    BenchmarkService,
    {provide: APP_BASE_HREF, useValue: environment.baseHref}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
