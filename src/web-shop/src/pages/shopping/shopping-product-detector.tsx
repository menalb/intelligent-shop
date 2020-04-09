import React, { useState, useEffect, useCallback } from 'react'
import ShoppingDetector, { ShoppingDetectorResponse } from './shopping-detector';
import ProductInfo from '../../components/product-info';
import { Product, BuyProduct } from './models';
import { searchResponseStatus } from '../../services/models';
//import { foundState } from '../../services/models';

// type searchProductResponseStatus = {
//     status: 'init' | 'loading' | 'error'
// } & {
//     status: 'loaded',
//     result: Product[]
// }



const ShoppingProductDetector = (props: { searchProductResponse: searchResponseStatus<Product> }) => {

    // const [searchStatus, setSearchStatus] = useState("init" as foundState<Product>)
    // const [operation, setOperation] = useState('');
    // const emptyProducts: Product[] = [];
    // const [foundProducts, setFoundProducts] = useState(emptyProducts);

    const searchStatus = props.searchProductResponse.status;

    //const anyProduct = (items: Product[]): boolean => items && items.length > 0;
    const anyProduct = searchStatus === 'loaded' && props.searchProductResponse.result.length > 0;
    const isNoProductFound = searchStatus !== "loading" && searchStatus !== "init" && !anyProduct;
    return (
        <>

            <section className="product-info">
                {isNoProductFound &&
                    <section className="product-search-empty">
                        <h4>Nessun prodotto trovato</h4>
                    </section>
                }
                {searchStatus === "loading" && <div>loading ...</div>}
                {searchStatus === "error" && <div>Error ...</div>}
                {anyProduct && <div className="list-group">
                    {props.searchProductResponse.result.map((product, key) => <ProductInfo key={key} product={product} />)}
                </div>}
            </section>
        </>
    );
}

export default ShoppingProductDetector;


