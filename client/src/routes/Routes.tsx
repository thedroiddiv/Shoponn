import { useState, useContext } from 'react'
import Footer from '../components/Footer'
import Topbar from '../components/Topbar'
import Home from '../pages/home/Home';
import Signup from '../pages/auth/Signup';
import Cart from '../pages/cart/Cart';
import Signin from '../pages/auth/Signin';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeContext } from '../theme/Context';
import ProductDetails from '../pages/product/ProductDetails';
import Signout from '../pages/auth/Signout';
import ProtectedRoute from './ProtectedRoute';
import UserProfile from '../pages/auth/user/UserProfile';

function Routes() {
    const themeHook = useState(useContext(ThemeContext)[0]);

    return (
        <div>
            <BrowserRouter>
                <ThemeContext.Provider value={themeHook}>
                    <Topbar />
                    <div>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/signup" exact component={Signup} />
                            <Route path="/signin" exact component={Signin} />
                            <Route path="/signout" exact component={Signout} />
                            <Route path="/cart" exact component={Cart} />
                            <Route path="/product/:id" exact component={ProductDetails} />
                            <ProtectedRoute path="/user/profile/" exact component={UserProfile} />
                        </Switch>
                    </div>
                    <Footer />
                </ThemeContext.Provider>
            </BrowserRouter>
        </div>
    )
}

export default Routes
