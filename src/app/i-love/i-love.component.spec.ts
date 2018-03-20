import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ILoveComponent } from './i-love.component';

describe('ILoveComponent', () => {
  let component: ILoveComponent;
  let fixture: ComponentFixture<ILoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ILoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ILoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
