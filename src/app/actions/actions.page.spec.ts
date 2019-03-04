import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsPage } from './actions.page';

describe('ActionsPage', () => {
  let component: ActionsPage;
  let fixture: ComponentFixture<ActionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
