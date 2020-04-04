export interface NoProduct {
    kind: 'no-product';
}

export interface BuyProduct {
    kind: 'add-to-cart';
    product?: string;
}

export interface Product {
    name: string;
    imageUrl: string;
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