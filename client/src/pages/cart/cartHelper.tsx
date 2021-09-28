import { CartProduct } from "../../data/models/product";

export const addToCart = (product: CartProduct, next: (message: string) => void): void => {
    let cart: any[] = []
    if (typeof window != undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart") + "");
        }

        for (const item in cart) {
            if (cart[item]._id === product._id) {
                next("Item already in cart")
                return;
            }
        }
        cart.push(product)
        localStorage.setItem("cart", JSON.stringify(cart))
        next("Item added to cart")
        return;
    }
    next("Operation failed!")
    return
}


export function setQuantity(product: CartProduct, quantity: number,next:()=>void) {
    if (typeof window != undefined) {
        let cart: any[] = []
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart") + "")
        }
        product.quantity = quantity
        const newList = cart.map(p => p._id===product._id ? product : p)
        localStorage.setItem("cart", JSON.stringify(newList))
        next();
    }
}

export function removeItemFromCart(id:string,next:()=>void) {
    if (typeof window != undefined) {
        let cart: any[] = []
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart") + "")
        }
       
        const newList = cart.filter(p=>p._id!==id)
        localStorage.setItem("cart", JSON.stringify(newList))
        next();
    }
}

export function getCart() {
    if ((typeof window != undefined) && (localStorage.getItem("cart"))) {
        return JSON.parse(localStorage.getItem("cart") + "")
    }
    return []
}

export function emptyCart(next: () => void) {
    if (typeof window !== undefined) {
        localStorage.removeItem("cart");
    }
    next()
}
