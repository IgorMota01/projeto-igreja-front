import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatechesisComponent } from './catechesis.component';

describe('CatechesisComponent', () => {
  let component: CatechesisComponent;
  let fixture: ComponentFixture<CatechesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatechesisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatechesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
