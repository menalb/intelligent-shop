import React, { useState } from 'react'
import ShoppingProductDetector from './shopping-product-detector'
import ShoppingCartSummary from './shopping-cart-summary'
import { BuyProduct } from './models'

import './shopping-page.css'

const ShoppingPage = () => {

    const [cartProducts, setCartProducts] = useState([] as BuyProduct[]);

    const addProductToCart = (product: BuyProduct) =>
        setCartProducts([...cartProducts, product]);

    return (<article className="container">
        <div>
            <ShoppingProductDetector onBuyProduct={addProductToCart} />
        </div >
        {cartProducts.length > 0 &&
            <section className="shopping-cart" >
                <h4>Carrello</h4>
                <ShoppingCartSummary products={cartProducts} />
            </section>}
    </article >
    );
}

export default ShoppingPage;