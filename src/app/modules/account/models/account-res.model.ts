import { IGetUser } from '../../user/models/get-user.model';
import { IAccounType } from './accoun-type.model';

export interface IResCreateAccount {
  id: string;
  customer: IGetUser;
  accountType: IAccounType;
  balance: number;
  state: boolean;
}
