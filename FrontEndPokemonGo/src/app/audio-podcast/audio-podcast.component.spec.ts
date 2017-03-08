import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPodcastComponent } from './audio-podcast.component';

describe('AudioPodcastComponent', () => {
  let component: AudioPodcastComponent;
  let fixture: ComponentFixture<AudioPodcastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioPodcastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
