import React, { useState } from 'react'
import ShoppingSearch from './shopping-search';
import ProductInfo from '../../components/product-info';
import { analyzeSentence } from '../../services/shopping-analyze/shopping-analyze-service';
import { AnalyzeResult, AnalyzeFailureResult } from '../../services/shopping-analyze/models';
import { ProductFound, Product, NoProduct, BuyProduct } from './models';
import { foundState } from '../../services/models';


const ShoppingProductDetector = (props: { onBuyProduct: (product: BuyProduct) => void }) => {

    const [foundProducts, setFoundProducts] = useState("init" as foundState<Product>)
    const onSearch = async (sentence: string) => {
        setFoundProducts("loading");
        const resp = await analyzeSentence(sentence);

        setFoundProducts(noProductFound(resp) ? [] : anyProducts(resp) ? resp.map(mapToProduct) : 'error');
    }

    const noProductFound = (productsResponse: AnalyzeResult | AnalyzeFailureResult): productsResponse is NoProduct => {
        const foundProducts = productsResponse as NoProduct
        return foundProducts && foundProducts.kind === "no-product"
    }

    const anyProducts = (productsResponse: AnalyzeResult | AnalyzeFailureResult): productsResponse is ProductFound[] => {
        const foundProducts = productsResponse as ProductFound[]
        return foundProducts && foundProducts.length >= 0;
    }

    const mapToProduct = (found: ProductFound): Product => ({
        name: found.product,
        imageUrl: found.imageUrl,
        description: ''
    })
    return (
        <>
            <section className="product-search-container">
                <ShoppingSearch searchSentence={onSearch} />
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