import React, { useState, useCallback, useEffect } from 'react'
import ShoppingProductDetector from './shopping-product-detector'
import ShoppingCartSummary from './shopping-cart-summary'
import { BuyProduct, Product } from './models'
import ShoppingDetector, { ShoppingDetectorResponse } from './shopping-detector'
import { searchResponseStatus } from '../../services/models'

import './shopping-page.css'

const ShoppingPage = () => {

    //const [cartProducts, setCartProducts] = useState([] as BuyProduct[]);
    const [cartProducts, setCartProducts] = useState([{ product: 'mela' }] as BuyProduct[]);

    const addProductToCart = (product: BuyProduct) =>
        setCartProducts([...cartProducts, product]);

    //const [searchStatus, setSearchStatus] = useState({ status: "init" } as searchResponseStatus<Product>)
    const fakeProducts = [{ name: 'mela', description: 'bar', imageUrl: '' }];
    const [searchStatus, setSearchStatus] = useState({ status: "loaded", result: fakeProducts } as searchResponseStatus<Product>);
    const [operation, setOperation] = useState('');
    const emptyProducts: Product[] = [];
    const [foundProducts, setFoundProducts] = useState(emptyProducts);

    const onActionDetected = useCallback((action: ShoppingDetectorResponse) => {

        if (action.kind === 'loading')
            setSearchStatus({ status: "loading" });
        else
            setSearchStatus({ status: "init" });

        if (action.kind === 'search') {
            setOperation('search')
            setFoundProducts(action.items);
            setSearchStatus({ status: "loaded", result: action.items });
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

    return (<article className="shopping-container">
        <section className="product-search-container">
            <ShoppingDetector detectedAction={onActionDetected} />
        </section>
        <section className="shopping-product-container">
            <ShoppingProductDetector searchProductResponse={searchStatus} />
            <div className="shopping-cart" >
                <CartArea products={cartProducts} />
            </div>
        </section >
    </article >
    );
}

export default ShoppingPage;

const CartArea = (props: { products: BuyProduct[] }) => (<>
    <h4 className="shopping-cart-title">
        <i className="fas fa-shopping-cart"></i>Carrello
    </h4>
    {
        props.products.length > 0 &&
        <ShoppingCartSummary products={props.products} />
    }
</>
)