import React, { useState } from 'react'
import { Product } from '../pages/shopping/models';

import './product-info.css'

const ProductInfo = (props: { product: Product }) => {
    const product = props.product;

    return (<article className="container">
        <h4>{product.name}</h4>
        <div className="row">
            <div className="product-image">
                <img className="product-img" src={product.imageUrl} />
            </div>
            <div className="col-md-8 col-xs-12">
                {product.description}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </div>
    </article>);
}


export default ProductInfo;