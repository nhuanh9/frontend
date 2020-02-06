import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListYourRoomsComponent } from './list-your-rooms.component';

describe('ListYourRoomsComponent', () => {
  let component: ListYourRoomsComponent;
  let fixture: ComponentFixture<ListYourRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListYourRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListYourRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
