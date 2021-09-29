import React, { useState } from 'react'
import { Carousel, Ratio } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { getImage } from '../data/api/coreApiCalls';
import { Product } from '../data/models/product'

interface FeaturedProps {
    products: Product[]
}


function Featured({ products }: FeaturedProps) {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: number, e: any) => {
        setIndex((selectedIndex + 1) % products.length);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect} interval={2000}>
            {products!==undefined && products.map((product: Product) => (
                <Carousel.Item className="carousel" key={product._id}>
                <Link style={{textDecoration:"none"}} to={`/product/${product._id}`}>
                    <Ratio aspectRatio="16x9">
                        <div>
                            <img
                                className="d-block w-100"
                                src={getImage(product._id)}
                                alt="product"
                            />
                            <div className="card-img-overlay overlay">
                            </div>
                        </div>
                    </Ratio>
                    <Carousel.Caption className="text-light">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                    </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default Featured