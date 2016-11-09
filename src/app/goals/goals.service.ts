import { Injectable } from '@angular/core';

import { Goal } from './goal.model';
import { GOALS } from './GOALS.mock';

@Injectable()
export class GoalsService {
    getGoals(): Promise<Goal[]> {
        return Promise.resolve(GOALS);
    }

    getGoalsSlowly(): Promise<Goal[]> {
        return new Promise<Goal[]>(resolve => setTimeout(() => resolve(GOALS), 400));
    }
}