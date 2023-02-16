import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInfoTransferComponent } from './all-info-transfer.component';

describe('AllInfoTransferComponent', () => {
  let component: AllInfoTransferComponent;
  let fixture: ComponentFixture<AllInfoTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInfoTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllInfoTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
