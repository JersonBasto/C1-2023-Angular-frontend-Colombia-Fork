import { IAccountRes } from "../../account/models/account.model";

export interface IResDeposit{
    id:string;
    account: IAccountRes;
    amount:number;
}