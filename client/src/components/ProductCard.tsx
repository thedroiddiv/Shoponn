import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { Product } from '../data/models/product';
import { getTheme } from "../theme/Apptheme"
import { ThemeContext } from '../theme/Context';
import { Link } from 'react-router-dom'
import { getImage } from '../data/api/coreApiCalls';


interface ProductCardProp {
    product: Product
}

function ProductCard({ product }: ProductCardProp) {

    const { bootstrap } = getTheme(useContext(ThemeContext)[0])
    const theme = bootstrap.productCard
    const imgUrl = getImage(product._id);

    return (
        <>
            <Link style={{textDecoration:"none"}} to={`/product/${product._id}`}>
            <Card className="text-center" border={theme.borderColor} style={{ width: '18rem' }} bg={theme.bgColor}>
                <Card.Img style={{ width: '100%', height: 'auto' }} className="p-2" variant="top" src={imgUrl} />
                <Card.Body>
                    <Card.Title className={`${theme.titleColor} fw-light`}>{product.name}</Card.Title>
                </Card.Body>
            </Card>
            </Link>
        </>
    )
}

export default ProductCard
