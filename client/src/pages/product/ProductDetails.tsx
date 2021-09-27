import { useState, useContext } from 'react'
import { Container, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ProductAlbum from '../../components/ProductAlbum'
import { ThemeContext } from '../../theme/Context';
import { getTheme } from "../../theme/Apptheme"
import QuantityInput from '../../components/QuantityInput'

import { products } from "../home/Home"

interface Params {
    id: string,
}

function ProductDetails() {
    const { id } = useParams<Params>()
    const { name, description, price, images } = products[0]
    const [quantity, setQuantity] = useState(1)
    const { bootstrap } = getTheme(useContext(ThemeContext)[0])


    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor}`}>
            <Container className="pb-5" >
                <div className="text-start py-4">
                    <h3>Product Details</h3>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <ProductAlbum photos={images} />
                    </div>
                    <div className="col-lg-5 mx-auto">
                        <h4>{name}</h4>
                        <p>{description}</p>
                        <h5>{price}</h5>
                        <hr />
                        <div className="row">
                            <div className="col-3">
                                <p className="fw-bold">Model</p>
                                <p className="fw-bold"> Type</p>
                                <p className="fw-bold">Ship to</p>
                            </div>
                            <div className="col-3">
                                <p>Black</p>
                                <p>Tshirt</p>
                                <p>Varanasi, IN</p>
                            </div>
                        </div>
                        <hr />
                        <div className="col-4 mt-5">
                            <QuantityInput
                                quantity={quantity}
                                increment={inc => setQuantity(inc)}
                                decrement={dec => setQuantity(dec)}
                            />
                        </div>
                        <div className="d-grid my-3">
                            <Button variant={bootstrap.cartBtnVarient} size="lg">
                                <span>Add To Cart</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Container >
        </div>
    )
}
export default ProductDetails
