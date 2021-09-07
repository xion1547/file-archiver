import {Component, OnInit } from '@angular/core';
import {FileService} from "./file.service";
import { File } from "./file";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  imageName: string = '';
  files: File[] = [];
  page: number = 0;
  pageSize: number = 5;

  constructor(private fileService: FileService) { }

  findFiles(): void {
    this.fileService.findAll().subscribe(files => this.files = files);
  }

  public updatePage(event?:PageEvent){
    if(event) {
      this.page = event.pageIndex;
    }
  }

  ngOnInit(): void {
    this.findFiles();
  }
}
