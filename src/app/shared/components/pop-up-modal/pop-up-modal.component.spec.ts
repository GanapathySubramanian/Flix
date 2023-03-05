import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpModalComponent } from './pop-up-modal.component';

describe('PopUpModalComponent', () => {
  let component: PopUpModalComponent;
  let fixture: ComponentFixture<PopUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
