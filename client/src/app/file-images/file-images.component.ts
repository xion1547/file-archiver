import {Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import {File} from "../files/file";
import {FileService} from "../files/file.service";

@Component({
  selector: 'app-file-images',
  templateUrl: './file-images.component.html',
  styleUrls: ['./file-images.component.scss']
})
export class FileImagesComponent implements OnInit {

  @Output() filteredFiles: EventEmitter<number> = new EventEmitter<number>();
  @Output() deletedId: EventEmitter<number> = new EventEmitter<number>();

  @Input() files?: File[];
  @Input() pages?: number;
  @Input() search?: string;

  fileNames: string[] = ["", "", "", "", ""];
  fileIds: number[] = [];
  urls: string[] = [];
  urlsMap = new Map<string, string>();
  localStorage: File[] = [];

  constructor(private fileService: FileService) { }

  deleteId(event: number) {
    this.deletedId.emit(event);
  }

  getIds(array: File[]): string{
    let result: string = "";
    for (let i = 0; i<array.length; i++) {
      result = result + array[i].id.toString() +",";
    }
    return result;
  }

  generateImages(changes: SimpleChanges): void {
    if (this.files) {
      this.fileService.generateUrls(this.getIds(this.files))
        .subscribe((files: any) => {
          if (this.files) {
            this.files.forEach(file => {
              this.urlsMap.set(file.filePath, files[file.id]);
              this.localStorage.push(file);
            })
          }
          this.updateNamesAndUrls(changes);
        });
    }
  }

  updateFileNames(): void{
    if (this.files) {
      for (let k = 0; k<this.files.length; k++) {
        let tempString: string[] = [];
        let tempName: string;
        tempString = this.files[k].filePath.split("/");
        tempName=tempString[tempString.length-1];
        this.fileNames[k] = tempName;
        this.fileIds[k] = this.files[k].id;
      }
    }
  }

  updateNamesAndUrls(changes: SimpleChanges): void {
    this.updateFileNames();
    this.addIntoUrls(changes);
    if(changes.search?.currentValue != changes.search?.previousValue) {
      this.filteredFiles.emit(changes.files.currentValue?.length);
    }
  }

  addIntoUrls(changes: SimpleChanges){
    const tempUrls: any[] = [];
    changes.files.currentValue.forEach((file: File) => {
      let a: any = this.urlsMap.get(file.filePath);
      tempUrls.push(a);
    })
    this.urls = tempUrls.map(el => el);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.files.previousValue?.length == 0 && changes.files.currentValue?.length != 0)
      || changes.pages?.firstChange == false
      || (changes.files.previousValue != 0 && changes.files.previousValue?.length != changes.files.currentValue?.length)) {
      if (changes.files.currentValue.every((val: File) => this.localStorage.includes(val))) {
        this.updateNamesAndUrls(changes)
      } else {
        this.generateImages(changes)
      }

    }
  }

}
