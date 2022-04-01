import { AccountModel } from "../models/account";

export interface AddAccountModel {
    name: string
    cpf: string
    email: string
    password: string
}

export interface AddAccount {
    add(account: AddAccountModel): Promise<AccountModel>
}