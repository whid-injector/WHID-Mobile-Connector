import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayloadLinuxPage } from './payload-linux.page';

describe('PayloadLinuxPage', () => {
  let component: PayloadLinuxPage;
  let fixture: ComponentFixture<PayloadLinuxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayloadLinuxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayloadLinuxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
