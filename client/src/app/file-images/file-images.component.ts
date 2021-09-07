import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {File} from "../files/file";
import {FileService} from "../files/file.service";

@Component({
  selector: 'app-file-images',
  templateUrl: './file-images.component.html',
  styleUrls: ['./file-images.component.scss']
})
export class FileImagesComponent implements OnInit {

  @Input() files?: File[];
  @Input() pages?: number;

  fileNames: string[] = [];
  urls: string[] = [];

  constructor(private fileService: FileService) { }

  getIds(array: File[]): string{
    let result: string = "";
    for (let i = 0; i<array.length; i++) {
      result = result + array[i].id.toString() +",";
    }
    return result;
  }

  generateImages(): void {
    if (this.files) {
      this.fileService.generateUrls(this.getIds(this.files))
        .subscribe(files => {
          this.urls = Object.values(files)
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
        this.fileNames.push(tempName.substring(0,tempName.length-4));
      }
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.files.previousValue?.length == 0
      && changes.files.currentValue?.length != 0)
      || changes.pages?.firstChange == false
      || (changes.files.previousValue!= 0 && changes.files.previousValue?.length!=changes.files.currentValue?.length)) {
      this.generateImages();
      this.updateFileNames();
    }
  }

}
