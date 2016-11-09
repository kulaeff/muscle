import { Currency } from '../shared/models/currency.model';

export class Goal {
    amount: number;
    category: {
        id: number;
        title: string;
    };
    createdAt: Date;
    currency: Currency;
    current: number;
    description: string;
    id: number;
    reachedAt: Date;
    title: string;
}