import { Injectable } from '@angular/core';

import { Account } from './account.model';
import { ACCOUNTS } from './accounts.mock';

@Injectable()
export class AccountsService {
    getAccounts(): Promise<Account[]> {
        return Promise.resolve(ACCOUNTS);
    }

    getAccountsSlowly(): Promise<Account[]> {
        return new Promise<Account[]>(resolve => setTimeout(() => resolve(ACCOUNTS), 400));
    }
}