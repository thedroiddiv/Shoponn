import { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { FiDelete } from 'react-icons/fi'
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
            createCategory(user._id, token, category).then(res => {
                setCategory({ name: "" })
                preload()
            })
        }
    }

    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor}`} style={{ minHeight: "75vh" }}>
            <Container className="pt-3">
                <Form className="col-4 mx-auto my-5 text-center">
                    <h3>Create a new category</h3>
                    <Form.Group className="row" controlId="formBasicEmail">
                        <Form.Control className="col" type="text" placeholder="Enter category name" value={category.name} onChange={handleChange('name')} />
                        <Button className="col-2" variant="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
                <div>
                    <h5 className="text-center">All Categories</h5>
                    <div className="row">
                        {categories.map((category: Category) => (
                            <Card className={`${bootstrap.cardBackground} ${bootstrap.textColor} p-3 my-3 mx-auto`} style={{ width: "250px" }} >
                                {category.name}
                                <button className={`btn ${bootstrap.textColor}`} style={{ position: "absolute", right: "0", top: "0", bottom: "0" }} onClick={() => { }}><FiDelete /></button>
                            </Card>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ManageCategories