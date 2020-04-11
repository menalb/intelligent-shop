import React, { useReducer, useState, useEffect } from 'react'
import { BuyProduct } from './models';

interface ShoppingCartSummaryProps {
    products: BuyProduct[]
}
const ShoppingCartSummary = (props: ShoppingCartSummaryProps) => {
    const [products, setProducts] = useState([] as CartProduct[]);

    const addProduct = (product: BuyProduct) => {
        const found = products.find(p => p.product.product === product.product);
        let prods: CartProduct[] = [];
        if (!found)
            prods = [...products, { product: product, quantity: 1 }]
        // if (found) {
        //     found.quantity += 1
        //     prods = [...products.filter(p => p.product.product !== product.product), found]
        // }
        // else {
        //     prods = [...products, { product: product, quantity: 1 }]
        // }
        setProducts(prods);
    }

    useEffect(() => {
        props.products.forEach(p => addProduct(p));
    }, [props.products])
    return (<article>
        {
            products.length === 0 ? <em>Carrello vuoto</em> :
                <ul className="shopping-cart-items">
                    {products.map((cartProd, index) => <li
                        key={index}
                        className="shopping-cart-item">
                        <span className="item-product">
                            {cartProd.product.product}
                        </span>
                        <span className="item-qty">
                            {cartProd.quantity}
                        </span>
                    </li>)}
                </ul>
        }

    </article>);
}


export default ShoppingCartSummary;

interface CartProduct {
    product: BuyProduct;
    quantity: number;
}