export type Category = 'Food' | 'Furniture' | 'Accessory';

export interface Expense {
    id: string;
    item: string;
    category: Category;
    amount: number;
    selected?: boolean;
}
