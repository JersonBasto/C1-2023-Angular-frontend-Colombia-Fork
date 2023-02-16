import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDepositComponent } from './info-deposit.component';

describe('InfoDepositComponent', () => {
  let component: InfoDepositComponent;
  let fixture: ComponentFixture<InfoDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDepositComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
