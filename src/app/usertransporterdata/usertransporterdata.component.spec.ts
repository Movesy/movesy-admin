import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertransporterdataComponent } from './usertransporterdata.component';

describe('UsertransporterdataComponent', () => {
  let component: UsertransporterdataComponent;
  let fixture: ComponentFixture<UsertransporterdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsertransporterdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertransporterdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
