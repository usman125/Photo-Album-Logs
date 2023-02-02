import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotosStore } from './stores/photos/photos-store';
import { LogsStore } from './stores/logs/logs-store';
import { UserStore } from './stores/user/user-store';
import { AlbumsStore } from './stores/albums/albums-store';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    PhotosStore,
    LogsStore,
    UserStore,
    AlbumsStore,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
