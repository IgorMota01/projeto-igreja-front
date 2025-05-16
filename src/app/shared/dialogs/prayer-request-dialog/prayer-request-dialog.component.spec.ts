import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerRequestDialogComponent } from './prayer-request-dialog.component';

describe('PrayerRequestDialogComponent', () => {
  let component: PrayerRequestDialogComponent;
  let fixture: ComponentFixture<PrayerRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrayerRequestDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrayerRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
