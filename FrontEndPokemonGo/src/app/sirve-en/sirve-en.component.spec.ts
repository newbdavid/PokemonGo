import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SirveEnComponent } from './sirve-en.component';

describe('SirveEnComponent', () => {
  let component: SirveEnComponent;
  let fixture: ComponentFixture<SirveEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SirveEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SirveEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
