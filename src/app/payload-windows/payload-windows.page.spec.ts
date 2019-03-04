import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayloadWindowsPage } from './payload-windows.page';

describe('PayloadWindowsPage', () => {
  let component: PayloadWindowsPage;
  let fixture: ComponentFixture<PayloadWindowsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayloadWindowsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayloadWindowsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
