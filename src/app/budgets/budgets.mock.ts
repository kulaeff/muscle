import { Budget } from './budget.model';

export const BUDGETS: Budget[] = [
    {
        category: {
            description: 'Расходы на оплату доступа к сети Интернет и мобильную связь',
            createdAt: new Date(2015, 3, 24),
            id: 10,
            title: 'Интернет и связь',
            type: 0
        },
        currency: {
            id: 1,
            code: 'RUB',
            symbol: '₽',
        },
        current: 0,
        date: new Date(2016, 9, 1),
        id: 1,
        limit: 1000
    },
    {
        category: {
            description: 'Продукты питания, готовая еда',
            createdAt: new Date(2015, 5, 14),
            id: 11,
            title: 'Продукты',
            type: 0
        },
        currency: {
            id: 1,
            code: 'RUB',
            symbol: '₽',
        },
        current: 4758,
        date: new Date(2016, 9, 1),
        id: 1,
        limit: 10000
    },
];