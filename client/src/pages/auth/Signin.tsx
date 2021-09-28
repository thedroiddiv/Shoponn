import { useContext, useState } from 'react'
import { Button, Col, Container, Form, ToastContainer } from 'react-bootstrap'
import { ThemeContext } from '../../theme/Context';
import { getTheme } from "../../theme/Apptheme"
import { LoginUserDto } from '../../data/dto/UserDto';
import { authenticate, isAuthenticated, signin } from './helper/auth.helper';
import { toast } from 'react-toastify';
import { History } from 'history';


interface SigninProps {
    history: History
}

function Signin({ history }: SigninProps) {

    const { bootstrap } = getTheme(useContext(ThemeContext)[0])
    const [values, setValues] = useState<LoginUserDto>({ email: "", password: "" })
    const { email, password } = values
    const handleChange = (name: string) => (e: any) => {
        setValues({
            ...values,
            [name]: e.target.value
        })
    }
    const handleSubmit = () => {
        const promise = signin(values)
        if (!promise) {

        } else {
            promise.then((res: any) => {
                if (res.error) {
                    console.log("Signin", JSON.stringify(res.error));
                    toast.error("Signin failed")
                } else {
                    authenticate(res.data, () => {
                        setValues({ email: "", password: "" })
                        const user = isAuthenticated()
                        if (user?.role === 1) {
                            history.push("/admin/dashboard")
                        } else if (user?.role === 0) {
                            history.push("/user/dashboard")
                        }
                    })
                }
            })
        }
    }

    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor}`} style={{ minHeight: "70vh" }}>
            <Container>
                <ToastContainer />
                <Col className="mx-auto py-5" lg={6}>
                    <h3>Enter your credentials</h3>
                    <Form className="mt-5">
                        <Form.Group className="pb-3 my-auto" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleChange('email')} />
                        </Form.Group>
                        <Form.Group className="pb-4" controlId="formBasicPassword">
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

export default Signin
