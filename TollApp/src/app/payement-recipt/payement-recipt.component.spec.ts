import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementReciptComponent } from './payement-recipt.component';

describe('PayementReciptComponent', () => {
  let component: PayementReciptComponent;
  let fixture: ComponentFixture<PayementReciptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayementReciptComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayementReciptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
