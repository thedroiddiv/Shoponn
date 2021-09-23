import React, { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { FiShoppingCart } from 'react-icons/fi'
import { IoSunnySharp, IoMoonSharp } from 'react-icons/io5'
import { Link, withRouter } from 'react-router-dom'
import { History } from 'history';
import { ThemeContext } from '../theme/Context'
import { getTheme } from "../theme/Apptheme"



type Props = {
    history: History
};

function Topbar({ history }: Props) {

    const [isDarkTheme, toggleDarkTheme] = useContext(ThemeContext)
    const { bootstrap } = getTheme(isDarkTheme)

    const currentTab = (path: String) => {
        if (history.location.pathname === path) {
            return bootstrap.selectedTabColor
        }
        return bootstrap.topBarText
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg={bootstrap.topBarColor} variant={bootstrap.topBarVarient}>
                <Container>
                    <Navbar.Brand>
                        <Link to="/" style={{ textDecoration: "none" }} className={`${currentTab("/")}`}>
                            <span><FiShoppingCart /></span>
                            <span className="mx-4">Shoponn</span>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><Link style={{ textDecoration: "none" }} className={`${currentTab("/cart")}`} to="/cart"> Cart</Link></Nav.Link>
                            <Nav.Link><Link style={{ textDecoration: "none" }} className={`${currentTab("/profile")}`} to="/profile"> Profile</Link></Nav.Link>
                            <Nav.Link><Link style={{ textDecoration: "none" }} className={`${currentTab("/signup")}`} to="/signup"> Signup</Link></Nav.Link>
                            <Nav.Link><Link style={{ textDecoration: "none" }} className={`${currentTab("/signin")}`} to="/signin"> Signin</Link></Nav.Link>
                            <Nav.Link onClick={e => { }}> Signout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                    <Nav.Link onClick={() => { toggleDarkTheme(!isDarkTheme) }}>
                        {isDarkTheme ?
                            (<IoSunnySharp className={bootstrap.selectedTabColor} size="2em" />) :
                            (<IoMoonSharp className={bootstrap.selectedTabColor} size="2em" />)}
                    </Nav.Link>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                </Container>
            </Navbar>
        </>
    )
}

export default withRouter(Topbar)
