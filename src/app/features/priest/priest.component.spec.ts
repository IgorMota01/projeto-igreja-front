import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriestComponent } from './priest.component';

describe('PriestComponent', () => {
  let component: PriestComponent;
  let fixture: ComponentFixture<PriestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
