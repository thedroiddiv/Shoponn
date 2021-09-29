import { API } from "../../app.config";

export const getAllCategory = () => {
    return fetch(`${API}/category/get/all`)
        .then(res => {
            return res.json()
        })
        .catch(error => {
            console.log("coreApiCalls/getAllCategory/" + error);
        })
}

export const getCategoryById = (id:string) => {
    console.log(`getCategoryById ${id}`);
    
    return fetch(`${API}/category/${id}`)
    .then(res => res.json())
    .catch(error => {
        console.log("coreApAcalls/getCategoryById/" + error);
    })
}

export const getAllProducts = () => {
    return fetch(`${API}/product/get/all`)
        .then(res => res.json())
        .catch(error => {
            console.log("coreApAcalls/getAllCategory/" + error);
        })
}

export const getProduct = (productId: string) => {
    return fetch(`${API}/product/${productId}`,
        { method: 'GET' })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log("coreApAcalls/getProduct/" + error))
}

export const getImage = (productId: string) => (`${API}/product/photo/${productId}`)

export const getFeaturedImage = (productId: string) => (`${API}/product/photo/${productId}`)