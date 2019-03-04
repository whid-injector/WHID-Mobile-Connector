import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhidCheckComponent } from './whid-check.component';

describe('WhidCheckComponent', () => {
  let component: WhidCheckComponent;
  let fixture: ComponentFixture<WhidCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhidCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhidCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
