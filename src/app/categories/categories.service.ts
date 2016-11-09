import { Injectable } from '@angular/core';

import { Category } from './category.model';
import { CATEGORIES } from './categories.mock';

@Injectable()
export class CategoriesService {
    getCategories(): Promise<Category[]> {
        if (process.env.ENV === 'development') {
            return Promise.resolve(CATEGORIES);
        }
    }
}