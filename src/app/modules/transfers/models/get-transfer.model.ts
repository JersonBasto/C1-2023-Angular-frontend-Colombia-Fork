import { IResCreateAccount } from '../../account/models/account-res.model';

export interface IResTransfer {
  id: string;
  outcome: IResCreateAccount;
  income: IResCreateAccount;
  amount: number;
  reason: string;
  dateTime: number | Date;
}
