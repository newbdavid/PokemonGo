import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreyenteComponent } from './creyente.component';

describe('CreyenteComponent', () => {
  let component: CreyenteComponent;
  let fixture: ComponentFixture<CreyenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreyenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreyenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
