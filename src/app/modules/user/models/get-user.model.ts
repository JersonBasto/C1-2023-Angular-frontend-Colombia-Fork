import { IDocumenType } from './document-type.model';

export interface IGetUser {
  documentType: IDocumenType;
  document: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
}
