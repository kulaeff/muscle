import { Currency } from '../shared/models/currency.model';

export enum AccountType {
    ACCOUNT,
    CARD,
    CASH,
    CREDIT,
    DEPOSIT
}

export class Account {
    balances: any[];
    createdAt: Date;
    description: string;
    id: number;
    title: string;
    type: AccountType;
}