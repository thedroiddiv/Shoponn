import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { Product } from '../data/models/product';
import { getTheme } from "../theme/Apptheme"
import { ThemeContext } from '../theme/Context';
import { Link } from 'react-router-dom'


interface ProductCardProp {
    product: Product
}

function ProductCard({ product }: ProductCardProp) {

    const { bootstrap } = getTheme(useContext(ThemeContext)[0])
    const theme = bootstrap.productCard

    return (
        <>
            <Link style={{textDecoration:"none"}} to={`/product/${product.name}`}>
            <Card className="text-center" border={theme.borderColor} style={{ width: '18rem' }} bg={theme.bgColor}>
                <Card.Img style={{ width: '100%', height: 'auto' }} className="p-2" variant="top" src={product.images[0]} />
                <Card.Body>
                    <Card.Title className={`${theme.titleColor} fw-light`}>Card Title</Card.Title>
                </Card.Body>
            </Card>
            </Link>
        </>
    )
}

export default ProductCard
