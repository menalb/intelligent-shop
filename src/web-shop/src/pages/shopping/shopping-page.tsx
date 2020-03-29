import React, { useState } from 'react'
import ShoppingSearch from './shopping-search'

const ShoppingPage = () => {
    const [message, setMessage] = useState('')
    const [isCartEmpty, setCartStatus] = useState(true)

    return (<article className="container">
        <div>
            <section>
                <ShoppingSearch searchSentence={() => { }} />
            </section>
            <section>
                <h4>{message}</h4>
            </section>
            <section>
                <div className="list-group">

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