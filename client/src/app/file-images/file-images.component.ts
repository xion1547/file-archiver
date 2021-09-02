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

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pages) {
      this.generateImages();
    }
    console.log(changes)
  }

}
