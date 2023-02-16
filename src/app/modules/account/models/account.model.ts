import { IGetUser } from "../../main/interfaces/user-get/user-get.interface";
import { IAccounType } from "./accoun-type.model";

export interface IAccountRes{
    id:string,
    customer: IGetUser,
    accountType: IAccounType,
    balance:number,
    state:boolean
}