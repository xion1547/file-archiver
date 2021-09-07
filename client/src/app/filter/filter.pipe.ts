import { Pipe, PipeTransform } from '@angular/core';
import {File} from "../files/file";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  getName(filePath: string): string{
    let tempString: string[];
    let fileName: string;
    tempString = filePath.split("/");
    fileName=tempString[tempString.length-1];
    return fileName.substring(0,fileName.length-4);
  }

  transform(files: File[], searchText: string): File[] {

    if (!files) {
      return files;
    }
    if (!searchText) {
      return files;
    }
    searchText = searchText.toLocaleLowerCase();

    return files.filter(file => {
      return this.getName(file.filePath).toLocaleLowerCase().includes(searchText);
    });
  }

}
