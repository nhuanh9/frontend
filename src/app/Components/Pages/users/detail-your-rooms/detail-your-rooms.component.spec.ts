import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailYourRoomsComponent } from './detail-your-rooms.component';

describe('DetailYourRoomsComponent', () => {
  let component: DetailYourRoomsComponent;
  let fixture: ComponentFixture<DetailYourRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailYourRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailYourRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
