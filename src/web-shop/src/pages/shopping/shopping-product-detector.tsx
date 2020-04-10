import React, { useState, useEffect } from 'react'
import ProductInfo from '../../components/product-info';
import { Product } from './models';
import { searchResponseStatus } from '../../services/models';


const ShoppingProductDetector = (props: { searchProductResponse: searchResponseStatus<Product> }) => {
    const emptyProducts: Product[] = [];
    const [currentProducts, setCurrentProducts] = useState(emptyProducts);
    const searchStatus = props.searchProductResponse.status;

    useEffect(() => {
        if (searchStatus === 'loaded')
            setCurrentProducts(props.searchProductResponse.result);
    }, [searchStatus]);

    const anyProduct = currentProducts.length > 0;
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
                    {currentProducts.map((product, key) => <ProductInfo key={key} product={product} />)}
                </div>}
            </section>
        </>
    );
}

export default ShoppingProductDetector;


