import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingdetailsComponent } from './readingdetails.component';

describe('ReadingdetailsComponent', () => {
  let component: ReadingdetailsComponent;
  let fixture: ComponentFixture<ReadingdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
