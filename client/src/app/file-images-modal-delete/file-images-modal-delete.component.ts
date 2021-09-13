import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileService} from "../files/file.service";

@Component({
  selector: 'app-file-images-modal-delete',
  templateUrl: './file-images-modal-delete.component.html',
  styleUrls: ['./file-images-modal-delete.component.scss']
})
export class FileImagesModalDeleteComponent implements OnInit {

  @Output() setDeleteFalse: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() showDelete?: boolean;
  @Input() fileId?: number;

  constructor(private fileService: FileService) { }

  hideDeleteEmit(){
    this.setDeleteFalse.emit(false);
  }

  deleteFile(){
    if(this.fileId) {
      this.fileService.deleteFile(this.fileId).subscribe();
    }
  }

  ngOnInit(): void {
  }

}
