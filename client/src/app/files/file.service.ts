import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { File } from "./file";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private fileUrl: string;

  constructor(private http: HttpClient) {
    this.fileUrl = 'http://localhost:8080/files';
  }

  public findAll(): Observable<File[]>{
    return this.http.get<File[]>(this.fileUrl+"/findFiles");
  }

  public save(file: File) {
    return this.http.post<File>(this.fileUrl, file);
  }
}

