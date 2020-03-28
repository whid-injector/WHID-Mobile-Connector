import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExfiltratedDataPage } from './exfiltrated-data.page';

describe('ExfiltratedDataPage', () => {
  let component: ExfiltratedDataPage;
  let fixture: ComponentFixture<ExfiltratedDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExfiltratedDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExfiltratedDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
