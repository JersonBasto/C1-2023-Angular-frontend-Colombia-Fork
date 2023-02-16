import { IAccounType } from './accoun-type.model';

export interface ICreateAccount {
  customer: string;
  accountType: IAccounType;
  balance?: number;
}
