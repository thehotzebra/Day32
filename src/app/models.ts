export interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export interface Cart {
    id: string;
    name: string;
    address: string;
    delivery: string;
    items: Item[]
}