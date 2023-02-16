import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingBackdropsComponent } from './trending-backdrops.component';

describe('TrendingBackdropsComponent', () => {
  let component: TrendingBackdropsComponent;
  let fixture: ComponentFixture<TrendingBackdropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingBackdropsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendingBackdropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
