import React, { useState } from 'react'
import ShoppingSearch from './shopping-search'
import { analyzeSentence } from './shopping-analyze-service'
import ProductInfo from '../../components/product-info'
import { ProductFound, Product } from './models'

const ShoppingPage = () => {
    const [message, setMessage] = useState('')
    const [isCartEmpty, setCartStatus] = useState(true)

    const [foundProducts, setFoundProducts] = useState([] as Product[])

    const onSearch = async (sentence: string) => {
        //TODO: Fix
        const resp = await analyzeSentence(sentence) as ProductFound[];

        if (resp && resp.length > 0) {
            setFoundProducts(resp.map(mapToProduct));
        }
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
                <div className="list-group">
                    {foundProducts.map((product, key) => <ProductInfo key={key} product={product} />)}
                </div>
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