import React, { useState, useEffect, useCallback } from 'react'
import ShoppingDetector, { ShoppingDetectorResponse } from './shopping-detector';
import ProductInfo from '../../components/product-info';
import { Product, BuyProduct } from './models';
import { foundState } from '../../services/models';

const ShoppingProductDetector = (props: { onBuyProduct: (product: BuyProduct) => void }) => {

    const [searchStatus, setSearchStatus] = useState("init" as foundState<Product>)
    const [operation, setOperation] = useState('');
    const emptyProducts: Product[] = [];
    const [foundProducts, setFoundProducts] = useState(emptyProducts);

    const onActionDetected = useCallback((action: ShoppingDetectorResponse) => {

        if (action.kind === 'loading')
            setSearchStatus("loading");
        else
            setSearchStatus("init");

        if (action.kind === 'search') {
            setOperation('search')
            setFoundProducts(action.items);
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
        props.onBuyProduct({
            kind: "add-to-cart",
            product: (foundProducts as Product[])[0].name
        })

    const anyProduct = (items: Product[]): boolean => items && items.length > 0;

    const isNoProductFound = searchStatus !== "loading" && searchStatus !== "init" && foundProducts.length === 0;
    return (
        <>
            <section className="product-search-container">
                <ShoppingDetector detectedAction={onActionDetected} />
            </section>
            <section className="product-info">
                {isNoProductFound &&
                    <section className="product-search-empty">
                        <h4>Nessun prodotto trovato</h4>
                    </section>
                }
                {searchStatus === "loading" && <div>loading ...</div>}
                {anyProduct(foundProducts) && <div className="list-group">
                    {foundProducts.map((product, key) => <ProductInfo key={key} product={product} />)}
                </div>}
            </section>
        </>
    );
}

export default ShoppingProductDetector;