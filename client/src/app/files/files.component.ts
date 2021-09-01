import { Component, OnInit } from '@angular/core';
import {FileService} from "./file.service";
import { File } from "./file";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  files: File[] = [];

  constructor(private fileService: FileService) { }

  findHeroes(): void {
    this.fileService.findAll().subscribe(files => this.files = files);
    console.log(this.files);
  }

  ngOnInit(): void {
    this.findHeroes();
  }

}
