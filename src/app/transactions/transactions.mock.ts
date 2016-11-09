import { Account, AccountType } from '../accounts/account.model';
import { Transaction, TransactionTypes } from './transaction.model';
import { Currency } from "../shared/models/currency.model";

export const TRANSACTIONS: Transaction[] = [
    {
        accountFrom: {
            balances: [
                {
                    value: 14353,
                    currency: {
                        id: 1,
                        code: 'RUB',
                        symbol: 'p.'
                    },
                },
            ],
            createdAt: new Date(2016, 8, 12),
            description: 'Счет по умолчанию',
            id: 1,
            title: 'Наличные',
            type: AccountType.CASH
        },
        accountTo: null,
        amount: 527,
        category: {
            id: 1,
            title: 'Продукты'
        },
        createdAt: new Date(2016, 8, 12),
        currency: {
            id: 1,
            code: 'RUB',
            symbol: '₽'
        },
        description: 'Стейтон',
        id: 1321,
        type: TransactionTypes.EXPENSE
    },
    {
        accountFrom: {
            balances: [
                {
                    value: 14353,
                    currency: {
                        id: 1,
                        code: 'RUB',
                        symbol: 'p.',
                    },
                },
            ],
            createdAt: new Date(2016, 8, 12),
            description: 'Дебетовая карта Сбербанка Visa Classic',
            id: 2,
            title: 'VISA 5665 Сбербанк',
            type: AccountType.CARD
        },
        accountTo: null,
        amount: 1000,
        category: {
            id: 2,
            title: 'Автомобиль'
        },
        createdAt: new Date(2016, 8, 13),
        currency: {
            id: 1,
            code: 'RUB',
            symbol: '₽'
        },
        description: 'Бензин',
        id: 1323,
        type: TransactionTypes.EXPENSE
    },
    {
        accountFrom: {
            balances: [
                {
                    value: 14353,
                    currency: {
                        id: 1,
                        code: 'RUB',
                        symbol: 'p.'
                    }
                }
            ],
            createdAt: new Date(2016, 8, 12),
            description: 'Дебетовая карта Сбербанка Visa Classic',
            id: 2,
            title: 'VISA 5665 Сбербанк',
            type: AccountType.CARD
        },
        accountTo: null,
        amount: 1000,
        category: {
            id: 2,
            title: 'Автомобиль'
        },
        createdAt: new Date(2016, 8, 13),
        currency: {
            id: 1,
            code: 'RUB',
            symbol: '₽'
        },
        description: 'Бензин',
        id: 1323,
        type: TransactionTypes.EXPENSE
    },
    {
        accountFrom: null,
        accountTo: {
            balances: [
                {
                    value: 14353,
                    currency: {
                        id: 1,
                        code: 'RUB',
                        symbol: 'p.'
                    }
                }
            ],
            createdAt: new Date(2016, 8, 12),
            description: 'Дебетовая карта Сбербанка Visa Classic',
            id: 2,
            title: 'VISA 5665 Сбербанк',
            type: AccountType.CARD
        },
        amount: 30000,
        category: {
            id: 3,
            title: 'Зарплата'
        },
        createdAt: new Date(2016, 8, 4),
        currency: {
            id: 1,
            code: 'RUB',
            symbol: '₽'
        },
        description: 'Userstory: аванс за июль',
        id: 13214,
        type: TransactionTypes.INCOME
    },
    {
        accountFrom: {
            balances: [
                {
                    value: 14353,
                    currency: {
                        id: 1,
                        code: 'RUB',
                        symbol: 'p.'
                    }
                }
            ],
            createdAt: new Date(2016, 8, 12),
            description: 'Дебетовая карта Сбербанка Visa Classic',
            id: 2,
            title: 'VISA 5665 Сбербанк',
            type: AccountType.CARD
        },
        accountTo: {
            balances: [
                {
                    value: 14353,
                    currency: {
                        id: 1,
                        code: 'RUB',
                        symbol: 'p.'
                    }
                }
            ],
            createdAt: new Date(2016, 8, 12),
            description: 'Кредитная карта Сбербанка Visa Gold',
            id: 3,
            title: 'VISA 4533 Сбербанк',
            type: AccountType.CARD
        },
        amount: 3400,
        category: null,
        createdAt: new Date(2016, 8, 15),
        currency: {
            id: 1,
            code: 'RUB',
            symbol: '₽'
        },
        description: 'Ежемесячный платеж по кредиту',
        id: 13215,
        type: TransactionTypes.TRANSFER
    },
    {
        accountFrom: {
            balances: [
                {
                    value: 14353,
                    currency: {
                        id: 1,
                        code: 'RUB',
                        symbol: 'p.'
                    }
                }
            ],
            createdAt: new Date(2016, 8, 12),
            description: 'Дебетовая карта Сбербанка Visa Classic',
            id: 2,
            title: 'VISA 5665 Сбербанк',
            type: AccountType.CARD
        },
        accountTo: null,
        amount: 527,
        category: {
            id: 1,
            title: 'Продукты'
        },
        createdAt: new Date(2016, 8, 12),
        currency: {
            id: 1,
            code: 'RUB',
            symbol: '₽'
        },
        description: 'Магнит',
        id: 13222,
        type: TransactionTypes.EXPENSE
    },
];