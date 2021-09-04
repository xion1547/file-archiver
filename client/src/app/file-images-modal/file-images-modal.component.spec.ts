import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileImagesModalComponent } from './file-images-modal.component';

describe('FileImagesModalComponent', () => {
  let component: FileImagesModalComponent;
  let fixture: ComponentFixture<FileImagesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileImagesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileImagesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
