import { useState, useContext, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ProductAlbum from '../../components/ProductAlbum'
import { ThemeContext } from '../../theme/Context';
import { getTheme } from "../../theme/Apptheme"
import QuantityInput from '../../components/QuantityInput'
import { CartProduct, Product } from '../../data/models/product';
import { getCategoryById, getImage, getProduct } from '../../data/api/coreApiCalls';
import { Category } from '../../data/models/category';
import { toast, ToastContainer } from 'react-toastify';
import { addToCart } from '../cart/cartHelper';

interface Params {
    id: string,
}

function ProductDetails() {
    const { id } = useParams<Params>()
    const [product, setProduct] = useState<Product>({ _id: "", name: "", description: "", price: 0, stock: 0, category: "" })
    const [category, setCategory] = useState<Category>()
    const imgUrl = getImage(id);
    const images = [imgUrl, imgUrl, imgUrl, imgUrl]
    
    useEffect(() => {
        getProduct(id)
            .then(res => {
                setProduct(res as Product)
                getCategoryById(res.category.toString())
                    .then(res => setCategory(res as Category))
            })
            .catch(error => console.log(`ProductDetails/useEffect/${error}`))
    })
    const [quantity, setQuantity] = useState(1);
    const { bootstrap } = getTheme(useContext(ThemeContext)[0])

    const addItemToCart = () => {
        const cartProd:CartProduct = {
            ...product,
            quantity:quantity
        } 
        addToCart(cartProd, (message:string) => {
            toast(message)
        })
    }

    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor}`}>
            <Container className="pb-5" >
                <ToastContainer/>
                <div className="text-start py-4">
                    <h3>Product Details</h3>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <ProductAlbum photos={images} />
                    </div>
                    <div className="col-lg-5 mx-auto">
                        <h4>{product?.name}</h4>
                        <p>{product?.description}</p>
                        <h5>Rs. {product?.price}</h5>
                        <hr />
                        <div className="row">
                            <div className="col-3">
                                <p className="fw-bold">Category</p>
                                <p className="fw-bold">Available</p>
                                <p className="fw-bold">Ship to</p>
                            </div>
                            <div className="col">
                                <p>{`${category?.name} `}</p>
                                <p>{product?.stock}</p>
                                <p>Varanasi, IN</p>
                            </div>
                        </div>
                        <hr />
                        <div className="col-4 mt-5">
                            <QuantityInput
                                quantity={quantity}
                                increment={inc => { inc<=5 ? setQuantity(inc) : toast("You can select maximum upto 5")}}
                                decrement={dec => {dec>=1 && setQuantity(dec)}}
                            />
                        </div>
                        <div className="d-grid my-3">
                            <Button variant={bootstrap.cartBtnVarient} size="lg" onClick={addItemToCart}>
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
