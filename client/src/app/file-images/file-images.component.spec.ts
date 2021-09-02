import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileImagesComponent } from './file-images.component';

describe('FileImagesComponent', () => {
  let component: FileImagesComponent;
  let fixture: ComponentFixture<FileImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
