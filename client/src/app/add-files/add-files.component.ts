import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FileService} from "../files/file.service";
import {File} from "../files/file";

@Component({
  selector: 'app-add-files',
  templateUrl: './add-files.component.html',
  styleUrls: ['./add-files.component.scss']
})
export class AddFilesComponent implements OnInit {

  @Output() addedFile: EventEmitter<any> = new EventEmitter<File>();

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
      this.fileService.uploadToS3(this.selectedFile, this.addedFile);
    } else {
      console.log("Error happened");
    }
  }

  ngOnInit(): void {
  }

}
