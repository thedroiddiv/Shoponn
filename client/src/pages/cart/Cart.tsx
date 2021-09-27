import { Card } from 'react-bootstrap'
import { useContext } from 'react'
import { getTheme } from '../../theme/Apptheme'
import { ThemeContext } from '../../theme/Context'
import { products as p } from "../home/Home"
import QuantityInput from '../../components/QuantityInput'
import { CartProduct } from '../../data/models/product'


function Cart() {

    const products : CartProduct[] = [{...p[0], quantity:5},{...p[0], quantity:5},{...p[0], quantity:5}]

    const { bootstrap } = getTheme(useContext(ThemeContext)[0])

    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor} px-auto`} style={{ minHeight: "70vh" }}>
            <h3 className=" text-center">Products in yout cart</h3>
            <div className="container row px-auto py-5">
                <div className="col-lg-8">
                    {products.map((product, index) => (
                        <div className="row">
                            <ul className="list-group">
                                <li className="list-group-item mb-4">
                                    <div className="row">
                                        <div className="col-4">
                                            <Card.Img src={product.images[0]} alt="product" />
                                        </div>
                                        <div className="col-8">
                                            <h6>{product.name}</h6>
                                            <p>Rs. {product.price}</p>
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
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="col-lg-4">
                    <div className="card p-3">
                        <h5>Complete your purchase here</h5>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cart
