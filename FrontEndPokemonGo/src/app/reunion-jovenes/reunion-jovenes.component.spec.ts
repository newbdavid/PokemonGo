import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionJovenesComponent } from './reunion-jovenes.component';

describe('ReunionJovenesComponent', () => {
  let component: ReunionJovenesComponent;
  let fixture: ComponentFixture<ReunionJovenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReunionJovenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionJovenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
