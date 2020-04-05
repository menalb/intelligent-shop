import React, { useState } from 'react'
import ShoppingDetector, { ShoppingDetectorResponse } from './shopping-detector';
import ProductInfo from '../../components/product-info';
import { Product, BuyProduct } from './models';
import { foundState } from '../../services/models';


const ShoppingProductDetector = (props: { onBuyProduct: (product: BuyProduct) => void }) => {

    const [foundProducts, setFoundProducts] = useState("init" as foundState<Product>)

    const onActionDetected = (action: ShoppingDetectorResponse) => {
        if (action.kind === 'loading') {
            setFoundProducts("loading");
        }
        if (action.kind === 'search') {
            setFoundProducts(action.items);
        }

        if (action.kind === 'add-to-cart') {
            console.log('compera');
        }
    }

    return (
        <>
            <section className="product-search-container">
                <ShoppingDetector detectedAction={onActionDetected} />
            </section>
            <section className="product-info">
                {foundProducts.length === 0 &&
                    <section className="product-search-empty">
                        <h4>Nessun prodotto trovato</h4>
                    </section>
                }
                {foundProducts === "loading" && <div>loading ...</div>}
                {foundProducts !== "loading" && foundProducts !== "init" && foundProducts !== "error" && foundProducts.length > 0 && <div className="list-group">
                    {foundProducts.map((product, key) => <ProductInfo key={key} product={product} />)}
                </div>}
            </section >
        </>
    );
}

export default ShoppingProductDetector;