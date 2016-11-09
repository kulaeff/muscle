import { Category } from '../categories/category.model';
import { Currency } from '../shared/models/currency.model';

export class Budget {
    category: Category;
    currency: Currency;
    current: number;
    date: Date;
    id: number;
    limit: number;
}