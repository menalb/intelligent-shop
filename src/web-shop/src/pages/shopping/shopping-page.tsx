import React, { useState, useCallback, useEffect } from 'react'
import ShoppingProductDetector from './shopping-product-detector'
import ShoppingCartSummary from './shopping-cart-summary'
import { BuyProduct, Product } from './models'
import ShoppingDetector, { ShoppingDetectorResponse } from './shopping-detector'
import { searchResponseStatus } from '../../services/models'

import './shopping-page.css'

const ShoppingPage = () => {

    const [cartProducts, setCartProducts] = useState([] as BuyProduct[]);

    const addProductToCart = (product: BuyProduct) =>
        setCartProducts([...cartProducts, product]);

    const [searchStatus, setSearchStatus] = useState({ status: "init" } as searchResponseStatus<Product>)
    const [operation, setOperation] = useState('');
    const emptyProducts: Product[] = [];
    const [foundProducts, setFoundProducts] = useState(emptyProducts);

    const onActionDetected = useCallback((action: ShoppingDetectorResponse) => {

        if (action.kind === 'loading')
            setSearchStatus({ status: "loading" } as searchResponseStatus<Product>);
        else
            setSearchStatus(({ status: "init" } as searchResponseStatus<Product>));

        if (action.kind === 'search') {
            setOperation('search')
            setFoundProducts(action.items);
            setSearchStatus(({ status: "loaded", result: action.items } as searchResponseStatus<Product>));
        }

        //if (searchStatus === 'loading' && action.kind === 'not-found' && foundProducts.length === 0) {
        //console.log('EMPTY')
        //setFoundProducts(emptyProducts);
        //}

        if (action.kind === 'add-to-cart')
            setOperation('buy')

    }, []);

    useEffect(() => {
        if (operation === "buy") buyProduct();
    }, [operation])

    const buyProduct = () =>
        addProductToCart({
            kind: "add-to-cart",
            product: (foundProducts as Product[])[0].name
        })

    return (<article className="container">
        <section className="product-search-container">
            <ShoppingDetector detectedAction={onActionDetected} />
        </section>
        <div>
            <ShoppingProductDetector searchProductResponse={searchStatus} />
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