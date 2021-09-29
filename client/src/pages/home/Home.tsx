import { useContext, useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard';
import { ThemeContext } from '../../theme/Context';
import { getTheme } from "../../theme/Apptheme"
import {Product } from '../../data/models/product';
import Featured from '../../components/Featured';
import { getAllProducts } from '../../data/api/coreApiCalls';


function Home() {

    const [products, setProducts] = useState<Product[]>([])
    const preload = ()  => {
        getAllProducts()
        .then(res => {
            const p = res as Product[]            
            if(p!==undefined) {
                setProducts(p)
            }
        })
        .catch(error => {
            console.log(`Home/preload/${error}`)
            
        })
    }
    useEffect(() => { preload() }, [])
    const { bootstrap } = getTheme(useContext(ThemeContext)[0])

    return (
        <div className={`${bootstrap.backgroundColor}`}>
            <Featured products={products} />
            <div className="container">
                <div className="row">
                    {products.map((product: Product) => (
                        <div key={product._id} className="col-sm-12 col-md-6 col-lg-3 my-4 mx-auto">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}



// export const { featured, products }: HomeProps = {
//     featured: [
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//     ],
//     products: [
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         }, {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         }, {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         }, {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         }, {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         }, {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//         {
//             name: "Lorem ipsum dolor sit",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//             price: 399,
//             featureImage: "https://picsum.photos/1600/900",
//             images:["https://picsum.photos/400/300"]

//         },
//     ]
// }


export default Home
