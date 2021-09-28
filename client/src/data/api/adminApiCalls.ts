import { API } from "../../app.config";
import { CreateCategoryDto } from '../dto/CategoryDto'


export const createCategory = (userId: string, token: string, category: CreateCategoryDto) => {
    return fetch(`${API}/category/create/${userId}`,
        {
            method: 'POST',
            headers:
            {
                Accept: 'application/json',
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(category)
        },
    ).then(response => {
        return response;
    }).catch(error => {
        console.log("adminapicall/createCategory/" + error);
    })
}

/***************************** PRODUCT ****************************/
export const createProduct = (userId: string, token: string, product: FormData) => {
    return fetch(`${API}/product/create/${userId}`,
        {
            method: 'POST',
            headers:
            {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,

            },
            body: product
        }
    )
        .then(response => response.json())
        .catch(error => {
            console.log("adminapicall/createProduct/" + error);
        })
}

export const updateProduct = (productId: string, userId: string, token: string, product: FormData) => {
    return fetch(`${API}/product/${productId}/${userId}`,
        {
            method: 'PUT',
            headers:
            {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(product)
        })
        .then(response => response.json())
        .catch(error => { console.log("adminapicall/createProduct/" + error) });
}

export const deleteProduct = (productId: string, userId: string, token: string) => {
    return fetch(`${API}/product/${productId}/${userId}`,
        {
            method: 'DELETE',
            headers:
            {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => response.json())
        .catch(error => { console.log("adminapicall/createProduct/" + error) })
}
/******************************** PRODUCT *********************************/


/******************************** USER ********************************/
export function getAllUsers(userId: string, token: string) {
    return fetch(`${API}/user/${userId}/all`,
        {
            method: "GET",
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .catch(error => { console.log("adminapicall/getAllUser/" + error) })
}
