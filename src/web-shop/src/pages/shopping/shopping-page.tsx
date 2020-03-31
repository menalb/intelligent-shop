import React, { useState } from 'react'
import ShoppingSearch from './shopping-search'
import { analyzeSentence } from '../../services/shopping-analyze/shopping-analyze-service'
import ProductInfo from '../../components/product-info'
import { ProductFound, Product } from './models'
import { AnalyzeResult, AnalyzeFailureResult } from '../../services/shopping-analyze/models'

const ShoppingPage = () => {
    const [message, setMessage] = useState('')
    const [isCartEmpty, setCartStatus] = useState(true)

    const [foundProducts, setFoundProducts] = useState([] as Product[] | "loading")

    const onSearch = async (sentence: string) => {
        setFoundProducts("loading");
        const resp = await analyzeSentence(sentence);

        if (anyProducts(resp)) {
            setFoundProducts(resp.map(mapToProduct));
        }
    }

    const anyProducts = (productsResponse: AnalyzeResult | AnalyzeFailureResult): productsResponse is ProductFound[] => {
        const products = productsResponse as ProductFound[]
        return products && products.length > 0;
    }

    const mapToProduct = (found: ProductFound): Product => ({
        name: found.product,
        imageUrl: found.imageUrl,
        description: ''
    })

    return (<article className="container">
        <div>
            <section>
                <ShoppingSearch searchSentence={onSearch} />
            </section>
            <section>
                <h4>{message}</h4>
            </section>
            <section>
                {foundProducts === "loading" && <div>loading ...</div>}
                {foundProducts !== "loading" && <div className="list-group">
                    {foundProducts.map((product, key) => <ProductInfo key={key} product={product} />)}
                </div>}
            </section >
        </div >
        {!isCartEmpty &&
            <section className="shopping-cart" >
                <h4>Carrello</h4>
                {/* <app-shopping-cart [items] = "cartItems" ></app - shopping - cart > */}
            </section>}
    </article >
    );
}

export default ShoppingPage;