import {EventEmitter, Injectable} from '@angular/core';
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

  public save(file: string): Observable<string> {
    return this.http.post(this.fileUrl+"/savePresignUrl", file, {responseType: 'text'});
  }

  public addFile(fileName: string) {
    return this.http.post(this.fileUrl+"/addFile", fileName);
  }

  public putInBucket(url: string, file: any) {
    return this.http.put(url, file);
  }

  public uploadToS3(imageFile: any, addedFile: EventEmitter<any>) {
    this.save(imageFile.name).subscribe( url => {
      this.putInBucket(url, imageFile).subscribe(() => {
        this.addFile(imageFile.name).subscribe(file => {
          addedFile.emit(file);
        })
      });
    });
  }

  public deleteFile(fileId: number) {
    return this.http.delete(this.fileUrl+"/deleteFileByIdEquals/" + fileId);
  }

}

