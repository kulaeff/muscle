import { Injectable } from '@angular/core';

import { Transaction } from './transaction.model';
import { TRANSACTIONS } from './transactions.mock';

@Injectable()
export class TransactionsService {
    /**
     * Gets the list of transactions
     *
     * @returns {Promise<Transaction[]>}
     */
    getTransactions(): Promise<Transaction[]> {
        return Promise.resolve(TRANSACTIONS);
    }

    getTransactionsSlowly(): Promise<Transaction[]> {
        return new Promise<Transaction[]>(resolve => setTimeout(() => resolve(TRANSACTIONS), 400));
    }
}