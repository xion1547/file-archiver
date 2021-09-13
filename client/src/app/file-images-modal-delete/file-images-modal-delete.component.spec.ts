import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileImagesModalDeleteComponent } from './file-images-modal-delete.component';

describe('FileImagesModalDeleteComponent', () => {
  let component: FileImagesModalDeleteComponent;
  let fixture: ComponentFixture<FileImagesModalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileImagesModalDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileImagesModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
