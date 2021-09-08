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
  pageLength: number = 0;
  searchedName: string = '';

  constructor(private fileService: FileService) { }

  findFiles(): void {
    this.fileService.findAll().subscribe(files => {
      this.files = files
      this.pageLength = files.length;
    });
  }

  updateSearched(){
      this.searchedName = this.imageName;
  }

  public updatePage(event?:PageEvent){
    if(event) {
      this.page = event.pageIndex;
    }
  }

  updateFilteredPage(newFilesAmount: number){
    if (this.searchedName!="") {
      this.pageLength = newFilesAmount;
    } else {
      this.pageLength = this.files.length;
    }
  }

  ngOnInit(): void {
    this.findFiles();
  }
}
