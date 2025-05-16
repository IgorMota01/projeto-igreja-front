import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassIntentionDialogComponent } from './mass-intention-dialog.component';

describe('MassIntentionDialogComponent', () => {
  let component: MassIntentionDialogComponent;
  let fixture: ComponentFixture<MassIntentionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MassIntentionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassIntentionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
