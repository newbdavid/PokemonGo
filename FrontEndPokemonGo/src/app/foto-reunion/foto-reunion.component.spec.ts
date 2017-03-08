import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoReunionComponent } from './foto-reunion.component';

describe('FotoReunionComponent', () => {
  let component: FotoReunionComponent;
  let fixture: ComponentFixture<FotoReunionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoReunionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
