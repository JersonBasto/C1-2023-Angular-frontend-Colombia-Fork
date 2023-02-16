import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositAllHistoryComponent } from './deposit-all-history.component';

describe('DepositAllHistoryComponent', () => {
  let component: DepositAllHistoryComponent;
  let fixture: ComponentFixture<DepositAllHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositAllHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositAllHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
