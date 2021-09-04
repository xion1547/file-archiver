import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilesComponent } from './files/files.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileImagesComponent } from './file-images/file-images.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileImagesModalComponent } from './file-images-modal/file-images-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FilesComponent,
    FileImagesComponent,
    FileImagesModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
