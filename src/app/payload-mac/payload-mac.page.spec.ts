import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayloadMacPage } from './payload-mac.page';

describe('PayloadMacPage', () => {
  let component: PayloadMacPage;
  let fixture: ComponentFixture<PayloadMacPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayloadMacPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayloadMacPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
