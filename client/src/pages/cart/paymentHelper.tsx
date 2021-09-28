import { API } from "../../app.config";
import { OrderData } from "../../data/models/order";
import { PaymentInfo } from "../../data/models/payment";

export const getPaymentToken = (userId:string, token:string) => {
    return fetch(`${API}/payment/gettoken/${userId}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            return res.json()
        })
        .catch(error => {
            console.log(`paymentHelper/getPaymentToken: ${error}`);
        })
}

export const processPayment = (userId:string, token:string, paymentInfo:PaymentInfo) => {
    return fetch(`${API}/payment/bt/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentInfo)
    }).then(res => {
        return res.json()
    }).catch(error => {
        console.log(`paymentHelper/processPayment: ${error}`);
    })
}

export function createOrder(userId:string, token:string, orderData:OrderData) {
    fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: orderData })
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log(`orderHelpers/createOrder: ${err}`);
    })
}
