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
    this.fileUrl = 'https://ec2.vantou2.com/files';
  }

  public findAll(): Observable<File[]>{
    return this.http.get<File[]>(this.fileUrl+"/findFiles");
  }

  public generateUrls(ids: string): Observable<Map<number, string>>{
    return this.http.get<Map<number, string>>(this.fileUrl+"/generatePresignUrls?PresignUrls=" +ids);
  }

  public save(file: File) {
    return this.http.post<File>(this.fileUrl, file);
  }
}

