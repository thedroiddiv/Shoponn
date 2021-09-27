import React from 'react'
import { Card } from 'react-bootstrap'
import QuantityInput from './QuantityInput'

interface ProductListItemProps {
    imgUrl?: string;
    title?: string;
    price?:string;
    quantity?:string
    description?: string;
    actions: []
}

function ProductListItem({ imgUrl, title, price,quantity, description, actions }: ProductListItemProps) {
    return (
        <div className="row">
            <div className="col-4">
                <Card.Img src={imgUrl} alt="product" />
            </div>
            <div className="col-8">
                <h6>{title}</h6>
                <p>Rs. {price}</p>
                <QuantityInput
                    quantity={5}
                    increment={inc => { }}
                    decrement={dec => { }}
                />
                <button className="btn mt-4 btn-danger btn-outline btn-">
                    Remove From Cart
                </button>
            </div>
        </div>
    )
}

export default ProductListItem
