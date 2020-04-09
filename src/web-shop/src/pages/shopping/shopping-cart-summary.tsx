import React from 'react'
import { BuyProduct } from './models';

interface ShoppingCartSummaryProps {
    products: BuyProduct[]
}
const ShoppingCartSummary = (props: ShoppingCartSummaryProps) =>
    (<article>
        {
            props.products.length === 0 ? <em>Carrello vuoto</em> :
                <ul>
                    {props.products.map((product, index) => <li key={index}>{product.product}</li>)}
                </ul>
        }

    </article>);


export default ShoppingCartSummary;