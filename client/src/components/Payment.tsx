import DropIn from 'braintree-web-drop-in-react'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { CartProduct } from '../data/models/product'
import { getToken, isAuthenticated } from '../pages/auth/helper/auth.helper'
import { emptyCart } from '../pages/cart/cartHelper'
import { createOrder, getPaymentToken, processPayment } from '../pages/cart/paymentHelper'

interface Paymentprops{
    products:CartProduct[],
    refresh:()=>void
}

function Payment({products,refresh}:Paymentprops) {

    const [clientToken, setClientToken] = useState(null)

    const user = isAuthenticated()
    const token = getToken()

    let instance:any = null

    const getPayToken = () => {
        if(user!=null) {
            getPaymentToken(user._id, token)
                .then(res => {
                    if (res.error) {
                        console.log(`paymentHelper/getPaymentToken}: ${res.error}`);
                    } else {
                        setClientToken(res.clientToken)
                        console.log(`paymentHelper/getPaymentToken: ${clientToken}`);
                    }
                })
                .catch(error => {
                    console.log(`paymentHelper/getPaymentToken: ${error}`);
                })
        }
    }

    useEffect(() => { getPayToken() })


    const onPurchase = () => {
        let nonce;
        if(user!=null) {
            instance && instance.requestPaymentMethod()
                .then((data:any )=> {
                    nonce = data.nonce
                    const paymentData = {
                        paymentMethodNonce: nonce,
                        amount:0
                    }
                    processPayment(user._id, token, paymentData)
                        .then(res => {
                            toast.success(res.success);
                            console.log(`paymentHelper/onPurchase: ${res.success}`)
                            emptyCart(() => { refresh() })
                            const orderData = {
                                products: products,
                                amount: res.transaction.amount,
                                transaction_id: res.transaction.id,
                            }
                            createOrder(user._id, token, orderData)
                        })
                        .catch(error => {
                            toast.error(error);
                            console.log(`paymentHelper/onPurchase: ${error}`)
                        })
                })
                .catch((error:any )=> console.log(`paymentHelper/onPurchase: ${error}`))
        }
    }

    const btDropIn = () => {
        return (
            <div>
                <ToastContainer />
                {(clientToken != null && products.length > 0) ?
                    (
                        <div className="bg-light p-4">
                            <DropIn
                                options={{ authorization: clientToken }}
                                onInstance={(inst) => {
                                    console.log(inst);
                                    instance = inst
                                }}
                            />
                            <div className="btn btn-primary" onClick={() => { onPurchase() }}>Buy @ Rs.<span>{0}</span></div>
                        </div>
                    ) :
                    (
                        <div>
                            <p className="text-danger">Payment server error!</p>
                        </div>
                    )}
            </div>
        )
    }

    return (
        <div>
            {btDropIn()}
        </div>
    )
}

export default Payment
