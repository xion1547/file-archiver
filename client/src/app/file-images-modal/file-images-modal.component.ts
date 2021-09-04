import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-images-modal',
  templateUrl: './file-images-modal.component.html',
  styleUrls: ['./file-images-modal.component.scss']
})
export class FileImagesModalComponent implements OnInit {

  @Input() urls?: string;
  @Input() fileName?: string;

  showModal: boolean = false;

  constructor() { }

  show(){
    this.showModal = true;
  }
  hide(){
    this.showModal = false;
  }

  ngOnInit(): void {
  }

}
