import { Component, OnInit } from '@angular/core';
import {FileService} from "../files/file.service";

@Component({
  selector: 'app-add-files',
  templateUrl: './add-files.component.html',
  styleUrls: ['./add-files.component.scss']
})
export class AddFilesComponent implements OnInit {

  show: boolean = false;
  selectedFile?: File;

  constructor(private fileService: FileService) {
  }

  showUpload(){
    this.show = !this.show;
  }

  fileChanged(event: any){
    this.selectedFile = event.target.files[0];
  }

  uploadFile(){
    if (this.selectedFile == undefined) {
      console.log('no file selected');
    } else if (this.selectedFile) {
      this.fileService.uploadToS3(this.selectedFile);
    } else {
      console.log("Error happened");
    }
  }

  ngOnInit(): void {
  }

}
