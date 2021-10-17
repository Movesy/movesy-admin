import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersmapComponent } from './ordersmap.component';

describe('OrdersmapComponent', () => {
  let component: OrdersmapComponent;
  let fixture: ComponentFixture<OrdersmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
