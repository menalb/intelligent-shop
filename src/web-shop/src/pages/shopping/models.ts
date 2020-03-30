export interface NoProduct {
    kind: 'no-product';
}

export interface BuyProduct {
    kind: 'buy';
    product?: string;
}

export interface ProductFound {
    kind: 'found-product';
    product: string;
    imageUrl: string;
}

export interface Product {
    name: string;
    imageUrl: string;
    description: string;
}