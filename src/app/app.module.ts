import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GanttModule} from 'src/app/gantt/domain/gantt.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GanttModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
