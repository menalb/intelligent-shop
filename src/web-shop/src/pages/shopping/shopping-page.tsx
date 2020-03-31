import React, { useState } from 'react'
import ShoppingProductDetector from './shopping-product-detector'
import './shopping-page.css'


const ShoppingPage = () => {

    const [isCartEmpty, setCartStatus] = useState(true)
    const [currentProduct, setCurrentProduct] = useState();



    return (<article className="container">
        <div>
            <ShoppingProductDetector />
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