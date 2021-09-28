import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { createProduct } from '../../../data/api/adminApiCalls'
import { getAllCategory } from '../../../data/api/coreApiCalls'
import { CreateProductDto } from '../../../data/dto/ProductDto'
import { Category } from '../../../data/models/category'
import { getTheme } from '../../../theme/Apptheme'
import { ThemeContext } from '../../../theme/Context'
import { getToken, isAuthenticated } from '../helper/auth.helper'

function AddProduct() {
    const [values, setValues] = useState<CreateProductDto>({ name: "", description: "", price: 0, category: "", stock: 0, photo: File })
    const [categories, setCategories] = useState<Category[]>([]);
    const { name, description, price, category, stock, photo } = values;
    const { bootstrap } = getTheme(useContext(ThemeContext)[0])
    const preload = () => {
        getAllCategory().then(res => {
            setCategories(res as Category[])
        }).then(error => console.error(error))
    }
    const user = isAuthenticated()
    useEffect(() => { preload() }, [])
    const handleChange = (name: string) => (event: any) => {
        const value = (name === "photo") ? event.target.files[0] : event.target.value
        console.log(name);

        setValues({
            ...values,
            [name]: value
        })
    }
    const handleSubmit = () => {

        const formData = new FormData()
        console.log(JSON.stringify(formData));

        formData.set('name', name)
        formData.set('description', description)
        formData.set('price', price.toString())
        formData.set('category', category);
        formData.set('stock', stock.toString());
        formData.set('photo', photo);


        if (user !== null) {
            createProduct(user._id, getToken(), formData)
                .then(res => {
                    console.log("AddProduct/handleSubmit/" + JSON.stringify(res));
                    toast("Product added!")
                    setValues({ name: "", description: "", price: 0, category: "", stock: 0, photo: File })
                })
                .catch(error => console.log("AddProduct/handleSubmit/" + JSON.stringify(error)))
        }
    }

    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor} `} style={{ minHeight: "75vh" }}>
            <Container>
                <ToastContainer />
                <Col className="mx-auto py-2" lg={6}>
                    <h3>Enter product details</h3>
                    <Form className="mt-3">
                        <Form.Group className="pb-3 my-auto" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={name} onChange={handleChange('name')} />
                        </Form.Group>
                        <Form.Group className="pb-3 my-auto" controlId="formBasicEmail">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" as="textarea" rows={3} value={description} onChange={handleChange('description')} />
                        </Form.Group>
                        <div className="row">
                            <Form.Group className="pb-3 my-auto col" controlId="formBasicEmail">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" min={0} placeholder="Enter price" value={price} onChange={handleChange('price')} />
                            </Form.Group>
                            <Form.Group className="pb-3 my-auto col" controlId="formBasicEmail">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type="number" min={0} placeholder="Enter price" value={stock} onChange={handleChange('stock')} />
                            </Form.Group>
                        </div>
                        <Form.Group className="pb-3 my-auto" controlId="formBasicEmail">
                            <Form.Label>Category</Form.Label>
                            <Form.Select onChange={handleChange('category')}>
                                <option>Select</option>
                                {categories.map((cat) => (<option key={cat._id} value={cat._id} >{cat.name}</option>))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formFileMultiple" className="pb-3 my-auto">
                            <Form.Label>Choose Photos</Form.Label>
                            <Form.Control type="file" onChange={handleChange('photo')} />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Container>
        </div>
    )
}

export default AddProduct
