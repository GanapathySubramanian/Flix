import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowSeasonsComponent } from './tvshow-seasons.component';

describe('TvshowSeasonsComponent', () => {
  let component: TvshowSeasonsComponent;
  let fixture: ComponentFixture<TvshowSeasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvshowSeasonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowSeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
