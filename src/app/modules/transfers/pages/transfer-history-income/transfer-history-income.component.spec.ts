import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferHistoryIncomeComponent } from './transfer-history-income.component';

describe('TransferHistoryIncomeComponent', () => {
  let component: TransferHistoryIncomeComponent;
  let fixture: ComponentFixture<TransferHistoryIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferHistoryIncomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferHistoryIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
