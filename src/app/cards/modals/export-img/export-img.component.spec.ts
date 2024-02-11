import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportImgComponent } from './export-img.component';

describe('ExportImgComponent', () => {
  let component: ExportImgComponent;
  let fixture: ComponentFixture<ExportImgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportImgComponent]
    });
    fixture = TestBed.createComponent(ExportImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
