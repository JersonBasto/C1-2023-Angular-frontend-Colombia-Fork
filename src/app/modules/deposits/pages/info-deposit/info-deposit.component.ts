import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-deposit',
  templateUrl: './info-deposit.component.html',
  styleUrls: ['./info-deposit.component.scss']
})
export class InfoDepositComponent implements OnInit {
  json = {
    "id": "5809753c-6a53-4ca9-9559-a4acd26cd7fe",
    "amount": 100,
    "dateTime": 1675969798841,
    "account": {
      "id": "1d7b369a-e5fa-4c13-bc52-5d9ac820c1c5",
      "balance": 100,
      "state": true,
      "customer": {
        "id": "243d1cd6-01f5-4594-bef2-a41aa3fd417e",
        "state": true
      },
      "accountType": {
        "id": "4cbe32bf-581a-4fb4-bbff-24220f7195d1",
        "state": true
      }
    }
  }
  idDeposit: string;
  amountDeposit: number
  idAccount: string
  balance: number
  stateAccount: boolean
  accounType: {}
  constructor() {
    this.idDeposit = ""
    this.amountDeposit = 0
    this.idAccount = ""
    this.balance = 0
    this.accounType = {}
    this.stateAccount = false
  }

  ngOnInit(): void {
    this.idDeposit = this.json.id
    this.amountDeposit = this.json.amount
    this.idAccount = this.json.account.id
    this.balance = this.json.account.balance
    this.accounType = this.json.account.accountType
    this.stateAccount = this.json.account.state
  }

}
