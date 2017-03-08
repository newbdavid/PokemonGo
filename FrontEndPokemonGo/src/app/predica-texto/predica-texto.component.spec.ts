import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredicaTextoComponent } from './predica-texto.component';

describe('PredicaTextoComponent', () => {
  let component: PredicaTextoComponent;
  let fixture: ComponentFixture<PredicaTextoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredicaTextoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredicaTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
