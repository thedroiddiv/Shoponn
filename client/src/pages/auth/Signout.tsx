import { useContext } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../theme/Context';
import { getTheme } from "../../theme/Apptheme"
import { signout } from './helper/auth.helper';
import { History } from 'history';


interface SignoutProps {
    history: History
}

function Signout({ history }: SignoutProps) {
    const { bootstrap } = getTheme(useContext(ThemeContext)[0])

    const handleSubmit = () => {
        signout(() => {
            history.push("/")
        })
    }

    return (
        <div style={{ minHeight: "70vh" }} className={`${bootstrap.backgroundColor} ${bootstrap.textColor} text-center p-5`}>
            <Container className="col-lg-6 pt-5">
                <h3>Are you sure you want to signout?</h3>
                <div className="d-grid gap-2">
                    <Button className="mt-5" variant="primary" size="lg" onClick={handleSubmit}>
                        Signout
                    </Button>
                    <Link to="/" className="btn btn-outline-secondary btn-lg">
                        Cancel
                    </Link>
                </div>
            </Container>
        </div>
    )
}

export default Signout
