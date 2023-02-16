import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferHistoryOutcomeComponent } from './transfer-history-outcome.component';

describe('TransferHistoryOutcomeComponent', () => {
  let component: TransferHistoryOutcomeComponent;
  let fixture: ComponentFixture<TransferHistoryOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferHistoryOutcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferHistoryOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
