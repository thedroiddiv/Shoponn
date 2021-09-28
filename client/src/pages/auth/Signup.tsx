import { useContext, useState } from 'react'
import { Button, Col, Container, Form } from 'react-bootstrap'
import { ThemeContext } from '../../theme/Context';
import { getTheme } from "../../theme/Apptheme"
import { CreateUserDto } from '../../data/dto/UserDto';
import { signup } from './helper/auth.helper';
import { toast, ToastContainer } from 'react-toastify';
import { History } from 'history';

interface SignupProps {
    history: History
}

function Signup({ history }: SignupProps) {

    const { bootstrap } = getTheme(useContext(ThemeContext)[0])
    const [values, setValues] = useState<CreateUserDto>({ email: "", firstName: "", lastName: "", password: "" })
    const { firstName, lastName, email, password } = values
    const handleChange = (name: string) => (e: any) => {
        setValues({
            ...values,
            [name]: e.target.value
        })
    }
    const handleSubmit = (e: any) => {
        const user: CreateUserDto = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        const promise = signup(user)
        if (typeof promise === 'undefined') {
            toast.error("Signup failed")
        } else {
            promise.then(res => {
                if (res) {
                    setValues({ email: "", firstName: "", lastName: "", password: "" })
                    toast("Signed up successfully")
                    setTimeout(() => {
                        history.push("/signin")
                    }, 1000);
                    console.log(`Signup/${res}`)
                } else {
                    toast.error("Signup failed")
                }
            }
            )
        }
    }

    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor}`} style={{ minHeight: "70vh" }}>
            <Container>
                <Col className="mx-auto py-5" lg={6}>
                    <ToastContainer />
                    <h3>Enter details</h3>
                    <Form className="my-auto mt-4">
                        <Form.Group className="mb-3 my-auto" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <div className="row">
                                <div className="col">
                                    <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={handleChange('firstName')} />
                                </div>
                                <div className="col">
                                    <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={handleChange('lastName')} />
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3 my-auto" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleChange('email')} />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={handleChange('password')} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Container>
        </div>
    )
}

export default Signup
