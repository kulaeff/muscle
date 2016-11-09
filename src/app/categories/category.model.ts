/**
 * Типы категорий
 */
export enum CategoryTypes {
    EXPENSE,
    INCOME,
    MIXED
}

/**
 * Категория
 */
export class Category {
    /**
     * Дата создания категории
     */
    createdAt: Date;

    /**
     * Описание категории
     */
    description: string;

    /**
     * ID категории
     */
    id: number;

    /**
     * Название категории
     */
    title: string;

    /**
     * Тип категории
     */
    type: CategoryTypes;
}