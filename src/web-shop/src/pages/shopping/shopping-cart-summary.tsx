import React from 'react'
import { BuyProduct } from './models';

interface ShoppingCartSummaryProps {
    products: BuyProduct[]
}
const ShoppingCartSummary = (props: ShoppingCartSummaryProps) => {
    return (<article>
        {props.products.length === 0 ? <em>Carrello vuoto</em> :
            <ul>
                {props.products.map(product => <li>{product.product}</li>)}
            </ul>}

    </article>);
}


export default ShoppingCartSummary;