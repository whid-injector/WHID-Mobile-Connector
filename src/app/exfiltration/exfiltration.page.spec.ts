import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExfiltrationPage } from './exfiltration.page';

describe('ExfiltrationPage', () => {
  let component: ExfiltrationPage;
  let fixture: ComponentFixture<ExfiltrationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExfiltrationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExfiltrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
