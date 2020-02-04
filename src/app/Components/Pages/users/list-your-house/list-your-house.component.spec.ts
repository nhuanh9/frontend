import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListYourHouseComponent } from './list-your-house.component';

describe('ListYourHouseComponent', () => {
  let component: ListYourHouseComponent;
  let fixture: ComponentFixture<ListYourHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListYourHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListYourHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
