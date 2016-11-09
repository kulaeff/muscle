import { Category, CategoryTypes } from './category.model';

export const CATEGORIES: Category[] = [
    {
        description: 'Заработная плата',
        createdAt: new Date(2015, 5, 12),
        id: 1,
        title: 'Зарплата',
        type: CategoryTypes.INCOME
    },
    {
        description: 'Проценты по банковскому вкладу',
        createdAt: new Date(2015, 4, 16),
        id: 2,
        title: 'Банковский процент',
        type: CategoryTypes.INCOME
    },
    {
        description: 'Гонорары и авторские вознаграждения',
        createdAt: new Date(2015, 3, 24),
        id: 3,
        title: 'Гонорар',
        type: CategoryTypes.INCOME
    },
    {
        description: 'Дивиденды по ценным бумагам',
        createdAt: new Date(2015, 3, 24),
        id: 4,
        title: 'Ценные бумаги',
        type: CategoryTypes.INCOME
    },
    {
        description: 'Продукты питания',
        createdAt: new Date(2015, 3, 24),
        id: 5,
        title: 'Продукты',
        type: CategoryTypes.EXPENSE
    },
    {
        description: 'Расходы на личное транспортное средство',
        createdAt: new Date(2015, 3, 24),
        id: 6,
        title: 'Автомобиль',
        type: CategoryTypes.EXPENSE
    },
    {
        description: 'Расходы на подарки',
        createdAt: new Date(2015, 3, 24),
        id: 7,
        title: 'Подарки',
        type: CategoryTypes.EXPENSE
    },
    {
        description: 'Расходы на кометические принадлежности и лекарственные средства',
        createdAt: new Date(2015, 3, 24),
        id: 8,
        title: 'Красота и здоровье',
        type: CategoryTypes.EXPENSE
    },
    {
        description: 'Расходы на образование',
        createdAt: new Date(2015, 3, 24),
        id: 9,
        title: 'Образование',
        type: CategoryTypes.EXPENSE
    },
    {
        description: 'Расходы на оплату доступа к сети Интернет и мобильную связь',
        createdAt: new Date(2015, 3, 24),
        id: 10,
        title: 'Интернет и связь',
        type: CategoryTypes.EXPENSE
    },
    {
        description: 'Расходы на различные развлечения',
        createdAt: new Date(2015, 3, 24),
        id: 11,
        title: 'Отдых и развлечения',
        type: CategoryTypes.EXPENSE
    },
    {
        description: 'Расходы на бытовую технику и гаджеты',
        createdAt: new Date(2015, 3, 24),
        id: 12,
        title: 'Электроника и гаджеты',
        type: CategoryTypes.EXPENSE
    },
    {
        description: 'Расходы на покупку бытовой химии',
        createdAt: new Date(2015, 3, 24),
        id: 13,
        title: 'Бытовая химия',
        type: CategoryTypes.EXPENSE
    },
    {
        description: 'Расходы на покупку одежды и обуви',
        createdAt: new Date(2015, 3, 24),
        id: 14,
        title: 'Одежда и обувь',
        type: CategoryTypes.EXPENSE
    },
];