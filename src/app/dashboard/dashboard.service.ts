import { Injectable } from '@angular/core';

import { Dashboard } from './dashboard.model';
import { DASHBOARD } from './dashboard.mock';

@Injectable()
export class DashboardService {
    /**
     * Gets the list of transactions
     *
     * @returns {Promise<Transaction[]>}
     */
    getDashboard(): Promise<Dashboard[]> {
        return Promise.resolve(DASHBOARD);
    }

    getDashboardSlowly(): Promise<Dashboard[]> {
        return new Promise<Dashboard[]>(resolve => setTimeout(() => resolve(DASHBOARD), 400));
    }
}