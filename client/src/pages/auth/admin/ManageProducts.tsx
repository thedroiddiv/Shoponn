import { useContext, useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { getAllProducts } from '../../../data/api/coreApiCalls'
import { Product } from '../../../data/models/product'
import { getTheme } from '../../../theme/Apptheme'
import { ThemeContext } from '../../../theme/Context'
import { getToken, isAuthenticated } from '../helper/auth.helper'
import { FiDelete } from 'react-icons/fi'
import ConfirmationDialog from '../../../components/ConfirmDialog'
import { Link } from 'react-router-dom'
import { deleteProduct } from '../../../data/api/adminApiCalls'
import { toast, ToastContainer } from 'react-toastify'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'

function ManageProducts() {
    const { bootstrap } = getTheme(useContext(ThemeContext)[0])
    const [products, setProducts] = useState<Product[]>([])
    const [show, setShow] = useState(false)
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
    const [productToRemove, setProductToRemove] = useState<any>()
    const user = isAuthenticated()
    const token = getToken()
    const loadData = () => {
        getAllProducts()
            .then(res => {
                setProducts(res as Product[])
                setFeaturedProducts(res as Product[])
            })
    }

    const showPopup = (product: Product) => {
        setProductToRemove(product)
        setShow(true)
    }
    const confirm = () => {
        if (user != null) {
            deleteProduct(productToRemove._id, user._id, token)
                .then(res => {
                    if (res.error) {
                        console.log(`ManageProducts/confirmDelete/${res.error}`)
                    } else {
                        setShow(false)
                        loadData();
                        toast("Product deleted!")
                    }
                })
                .catch(error => {
                    console.log(`ManageProducts/confirmDelete/${error}`)
                    setShow(false)
                })

        }
    }
    useEffect(() => { loadData() }, []);
    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor}`} style={{ minHeight: "75vh" }}>
            <ConfirmationDialog
                show={show}
                message={`Are you sure to remove the item?`}
                confirm={confirm}
                dismiss={() => { setShow(false) }}
            />
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 my-5 ">
                        <ListGroup>
                            <ListGroup.Item active>
                                <h5>All Products</h5>
                                <Link
                                    className="text-white"
                                    style={
                                        {
                                            textDecoration: "none",
                                            position: "absolute",
                                            right: "0",
                                            top: "0",
                                            bottom: "0"
                                        }
                                    }
                                    to={`/admin/product/add`}>
                                    <AiOutlineAppstoreAdd size={"40px"} color={"white"} />
                                </Link>
                            </ListGroup.Item>
                            {products.map((product: Product) => (
                                <ListGroup.Item className={`${bootstrap.cardBackground}`}>
                                    <Link className={`${bootstrap.textColor}`} style={{ textDecoration: "none" }} to={`/product/${product._id}`}>
                                        {product.name}
                                    </Link>
                                    <button className={`btn ${bootstrap.textColor}`} style={{ position: "absolute", right: "0", top: "0", bottom: "0" }} onClick={() => { showPopup(product) }}><FiDelete /></button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                    <div className="col-lg-6 my-5">
                        <ListGroup>
                            <ListGroup.Item active><h5>Featured Products</h5></ListGroup.Item>
                            {featuredProducts.map((product: Product) => (
                                <ListGroup.Item>
                                    {product.name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageProducts
