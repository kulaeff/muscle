import { Injectable } from '@angular/core';

import { Budget } from './budget.model';
import { BUDGETS } from './budgets.mock';

@Injectable()
export class BudgetsService {
    getBudgets(): Promise<Budget[]> {
        if (process.env.MOCKS) {
            return Promise.resolve(BUDGETS);
        }
    }
}