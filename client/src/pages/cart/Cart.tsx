import { Card } from 'react-bootstrap'
import { useContext, useState, useEffect } from 'react'
import { getTheme } from '../../theme/Apptheme'
import { ThemeContext } from '../../theme/Context'
import QuantityInput from '../../components/QuantityInput'
import { CartProduct } from '../../data/models/product'
import { getImage } from '../../data/api/coreApiCalls'
import { getCart, removeItemFromCart, setQuantity } from './cartHelper'
import { toast, ToastContainer } from 'react-toastify';
import CartItem from '../../components/CartItem'
import Payment from '../../components/Payment'
import { isAuthenticated } from '../auth/helper/auth.helper'
import { Link } from 'react-router-dom'


function Cart() {

    const { bootstrap } = getTheme(useContext(ThemeContext)[0]);
    const [products, setProducts] = useState<CartProduct[]>([])
    const [refresh, setRefresh] = useState(false);
    
    const preload = () => {
        setProducts(getCart() as CartProduct[])
    }
    
    useEffect(() => {}, [refresh])
    useEffect(() => { preload() }, [])

    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor} px-auto`} style={{ minHeight: "70vh" }}>
            <ToastContainer />
            <h3 className=" text-center">Products in yout cart</h3>

            {(products.length>0) ? (
            <div className="container row mx-auto py-5">
                <div className="col-lg-6">
                    <div className="row">
                    {products.map((cartProduct, index) => (
                        <div className="col-12 mx-auto">
                            <CartItem
                                product={cartProduct}
                                increment={qty => { qty <= 5 ? setQuantity(cartProduct, qty, preload) : toast("You can select maximum upto 5") }}
                                decrement={dec => { dec >= 1 && setQuantity(cartProduct, dec, preload) }}
                                removeFromCart={() => removeItemFromCart(cartProduct._id,preload)}
                            />
                        </div>
                    ))}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className={`card p-3 ${bootstrap.cardBackground}`}>
                        <h5>Complete your purchase here</h5>
                        {isAuthenticated() ?
                        (<Payment products={products} refresh={() => { setRefresh(!refresh) }} />) :
                        (<>
                            <p>Please signin to continue to payment</p>
                            <Link className={`btn btn-${bootstrap.cardBtnVarient}`} to="/signin">Signin</Link>
                        </>)
                    }
                    </div>
                </div>
            </div>
            ) : (
                <div className="container text-center mt-5">
                    <h5>
                        Your cart is empty!
                    </h5>
                </div>
            ) }

        </div>
    )
}

export default Cart