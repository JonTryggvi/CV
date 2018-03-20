import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefsAndCoworkersComponent } from './refs-and-coworkers.component';

describe('RefsAndCoworkersComponent', () => {
  let component: RefsAndCoworkersComponent;
  let fixture: ComponentFixture<RefsAndCoworkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefsAndCoworkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefsAndCoworkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
