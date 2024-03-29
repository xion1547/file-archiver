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
import { FormsModule } from '@angular/forms';
import {MDBBootstrapModule} from "angular-bootstrap-md";
import { FilterPipe } from './filter/filter.pipe';
import { AddFilesComponent } from './add-files/add-files.component';
import { FileImagesModalDeleteComponent } from './file-images-modal-delete/file-images-modal-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    FilesComponent,
    FileImagesComponent,
    FileImagesModalComponent,
    FilterPipe,
    AddFilesComponent,
    FileImagesModalDeleteComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        MDBBootstrapModule.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
