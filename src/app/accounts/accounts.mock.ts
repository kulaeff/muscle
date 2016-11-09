import { Account, AccountType } from './account.model';

export const ACCOUNTS: Account[] = [
    {
        balances: [
            {
                value: 3274.5,
                currency: {
                    id: 1,
                    code: 'RUB',
                    symbol: 'p.',
                }
            },
            {
                value: 500,
                currency: {
                    id: 2,
                    code: 'USD',
                    symbol: '$',
                }
            },
        ],
        description: '',
        createdAt: new Date(2015, 5, 12),
        id: 1,
        title: 'Наличные',
        type: AccountType.CASH
    },
    {
        balances: [
            {
                value: 15760,
                currency: {
                    id: 1,
                    code: 'RUB',
                    symbol: 'p.',
                }
            }
        ],
        description: '',
        createdAt: new Date(2015, 4, 16),
        id: 2,
        title: 'VISA 5665 Сбербанк',
        type: AccountType.CARD
    },
    {
        balances: [
            {
                value: -7800,
                currency: {
                    id: 1,
                    code: 'RUB',
                    symbol: 'p.',
                }
            }
        ],
        description: '',
        createdAt: new Date(2015, 4, 16),
        id: 3,
        title: 'VISA 2311 Сбербанк',
        type: AccountType.CARD
    },
    {
        balances: [
            {
                value: 805,
                currency: {
                    id: 1,
                    code: 'RUB',
                    symbol: 'p.',
                }
            }
        ],
        description: '',
        createdAt: new Date(2015, 3, 24),
        id: 4,
        title: 'Сбербанк 245354563453',
        type: AccountType.ACCOUNT
    }
];