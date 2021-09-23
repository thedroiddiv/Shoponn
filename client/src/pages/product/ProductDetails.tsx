import { useState, useContext } from 'react'
import { Container, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { HiPlus, HiMinus } from 'react-icons/hi'
import ProductAlbum from '../../components/ProductAlbum'
import { ThemeContext } from '../../theme/Context';
import { getTheme } from "../../theme/Apptheme"

interface Params {
    id: string,
}

const photos = [
    "https://picsum.photos/400/300", "https://picsum.photos/400/301", "https://picsum.photos/400/300"
    , "https://picsum.photos/400/301"
]
const desc = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. dolor sit amet consectetur adipisicing elit. dolor sit amet consectetur adipisicing elit.dolor sit amet consectetur adipisicing elit.Optio facere commodi cumque illum quaerat ad magnam quo aut fugit non."
const price = "Rs. 399"

function ProductDetails() {
    const { id } = useParams<Params>()
    const [quantity, setQuantity] = useState(1)
    const { bootstrap } = getTheme(useContext(ThemeContext)[0])


    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor}`}>
            <Container className="pb-5" >
                <div className="text-start py-4">
                    <h3>Product Details</h3>
                </div>
                <div className="row">
                    <div className="col-6">
                        <ProductAlbum photos={photos} />
                    </div>
                    <div className="col-5 mx-auto">
                        <h4>{id}</h4>
                        <p>{desc}</p>
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
                            <div className="input-group">
                                <span>
                                    <button type="button" className="btn btn-outline-secondary" onClick={e => (quantity > 1) && setQuantity(quantity - 1)}><HiMinus /></button>
                                </span>
                                <span className="border rounded border-secondary px-4 mx-2">{quantity}</span>
                                <span>
                                    <button type="button" className="btn btn-outline-secondary" onClick={e => (quantity < 5) && setQuantity(quantity + 1)} ><HiPlus /></button>
                                </span>
                            </div>
                        </div>
                        <div className="d-grid my-3">
                            <Button variant="primary" size="lg">
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
