import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TransferServiceService } from 'src/app/modules/transfers/services/transfer-service.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  public pages: { page: number }[] = [{ page: 1 }, { page: 2 }, { page: 3 }];

  public sizes: { size: number }[] = [{ size: 5 }, { size: 10 }, { size: 15 }];

  page: number;

  @Output()
  changePage: EventEmitter<number>;

  constructor(private readonly transferService: TransferServiceService) {
    this.changePage = new EventEmitter<number>();
    this.page = 1;
  }

  ngOnInit(): void {}

  getPage(page: number) {
    this.page = page;
    this.changePage.emit(this.page)
  }
}
