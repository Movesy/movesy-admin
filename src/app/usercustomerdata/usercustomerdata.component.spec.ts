import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercustomerdataComponent } from './usercustomerdata.component';

describe('UsercustomerdataComponent', () => {
  let component: UsercustomerdataComponent;
  let fixture: ComponentFixture<UsercustomerdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsercustomerdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercustomerdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
