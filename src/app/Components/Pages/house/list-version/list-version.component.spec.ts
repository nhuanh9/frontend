import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVersionComponent } from './list-version.component';

describe('ListVersionComponent', () => {
  let component: ListVersionComponent;
  let fixture: ComponentFixture<ListVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
