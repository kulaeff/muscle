import { Goal } from './goal.model';

export const GOALS: Goal[] = [
    {
        amount: 3000000,
        description: 'Трехкомнатная квартира где-нибудь на БАМе с раздельным санузлом, собственным отоплением.',
        category: {
            id: 1,
            title: 'Недвижимость',
        },
        createdAt: new Date(2015, 5, 12),
        currency: {
            id: 1,
            code: 'RUB',
            symbol: '₽',
        },
        current: 504800,
        id: 1,
        reachedAt: new Date(2016, 10, 20),
        title: 'Квартира трехкомнатная'
    },
    {
        amount: 500000,
        description: 'Mercedes Benz C600',
        category: {
            id: 2,
            title: 'Автомобиль',
        },
        createdAt: new Date(2016, 4, 18),
        currency: {
            id: 1,
            code: 'RUB',
            symbol: '₽',
        },
        current: 40800,
        id: 2,
        reachedAt: new Date(2018, 9, 11),
        title: 'BMW X5'
    },
    {
        amount: 60000,
        category: {
            id: 3,
            title: 'Бытовая техника',
        },
        description: 'iPhone 7 для жены',
        createdAt: new Date(2016, 5, 26),
        currency: {
            id: 1,
            code: 'RUB',
            symbol: '₽',
        },
        current: 26600,
        id: 3,
        reachedAt: new Date(2016, 9, 1),
        title: 'iPhone 7'
    },
];