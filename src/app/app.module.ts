import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//components
import { AppComponent } from './app.component';
import { SimpleHTTPComponent } from './components/simpleHttp';
import { YouTubeSearchComponent, SearchResultComponent, SearchBox } from './components/YouTubeSearchComponent';

// services
import { youTubeServiceInjectables } from './components/YouTubeSearchComponent';
@NgModule({
  declarations: [
    AppComponent,
    SimpleHTTPComponent,
    YouTubeSearchComponent,
    SearchResultComponent,
    SearchBox
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [youTubeServiceInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
