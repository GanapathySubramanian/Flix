import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowEpisodesComponent } from './tvshow-episodes.component';

describe('TvshowEpisodesComponent', () => {
  let component: TvshowEpisodesComponent;
  let fixture: ComponentFixture<TvshowEpisodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvshowEpisodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvshowEpisodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
