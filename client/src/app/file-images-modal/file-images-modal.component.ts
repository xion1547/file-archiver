import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-images-modal',
  templateUrl: './file-images-modal.component.html',
  styleUrls: ['./file-images-modal.component.scss']
})
export class FileImagesModalComponent implements OnInit {

  @Input() url?: string;
  @Input() fileName?: string;
  @Input() fileId?: number;

  showModal: boolean = false;
  showDelete: boolean = false;

  constructor() { }

  show(){
    this.showModal = true;
  }
  hide(){
    this.showModal = false;
  }

  showDeleteMethod(){
    this.showDelete = true;
  }

  hideDeleteMethod(event: boolean){
    this.showDelete = event;
  }

  ngOnInit(): void {
  }

}
