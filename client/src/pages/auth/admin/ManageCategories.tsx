import { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, ListGroup } from 'react-bootstrap'
import { createCategory } from '../../../data/api/adminApiCalls'
import { getAllCategory } from '../../../data/api/coreApiCalls'
import { CreateCategoryDto } from '../../../data/dto/CategoryDto'
import { Category } from '../../../data/models/category'
import { getTheme } from '../../../theme/Apptheme'
import { ThemeContext } from '../../../theme/Context'
import { getToken, isAuthenticated } from '../helper/auth.helper'

function ManageCategories() {

    const { bootstrap } = getTheme(useContext(ThemeContext)[0])
    const [category, setCategory] = useState<CreateCategoryDto>({ name: "" })
    const [categories, setCategories] = useState<Category[]>([])
    const user = isAuthenticated()
    const token = getToken()


    const preload = () => {
        getAllCategory()
            .then(res => setCategories(res as Category[]))
            .catch(error => console.log(error))
    }

    useEffect(() => {
        preload()
    }, [])

    const handleChange = (name: string) => (e: any) => {
        setCategory({
            ...category,
            [name]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (user !== null) {
            createCategory(user._id, token, category).then(res=> {
                setCategory({ name: "" })
                preload()
            })
        }
    }

    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor}`} style={{ minHeight: "75vh" }}>
            <Container className="mx-auto text-center">
                <div className="">
                    <h5>Create a new category here</h5>
                    <Form>
                        <div className="row px-5 mb-3">
                            <Form.Group className="col-lg-8 col-md-8 col-sm-12" controlId="formBasicEmail">
                                <Form.Control type="text" size="lg" placeholder="Enter category name" value={category.name} onChange={handleChange('name')} />
                            </Form.Group>
                            <Button variant="primary col-lg-4 col-md-4 col-sm-12" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
                <ListGroup>
                    {categories.map((category: Category) => (
                        <ListGroup.Item>{category.name}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </div>
    )
}

export default ManageCategories