import { Account } from '../accounts/account.model';
import { Currency } from '../shared/models/currency.model';

export enum TransactionTypes {
    INCOME,
    EXPENSE,
    TRANSFER
}


export class Transaction {
    /**
     * Аккаунт, с которого были списаны средства
     */
    accountFrom: Account;

    /**
     * Аккаунт, на который были зачислены средства
     */
    accountTo: Account;

    /**
     * Amount
     */
    amount: number;

    /**
     * Category
     */
    category: {
        id: number;
        title: string;
    };

    /**
     * Datetime
     */
    createdAt: Date;

    /**
     * Currency
     */
    currency: Currency;

    /**
     * Description
     */
    description: string;

    /**
     * ID
     */
    id: number;

    /**
     * Type
     */
    type: TransactionTypes;
}