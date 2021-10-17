import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersdataComponent } from './ordersdata.component';

describe('OrdersdataComponent', () => {
  let component: OrdersdataComponent;
  let fixture: ComponentFixture<OrdersdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
