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
import UserDashboard from '../pages/auth/user/UserDashboard';
import AdminRoute from './AdminRoute';
import AdminDashboard from '../pages/auth/admin/AdminDashboard';
import AddProduct from '../pages/auth/admin/AddProduct';
import ManageProducts from '../pages/auth/admin/ManageProducts';
import ManageCategories from '../pages/auth/admin/ManageCategories';
import ManageUsers from '../pages/auth/admin/ManageUsers';

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

                            <AdminRoute path="/admin/dashboard/" exact component={AdminDashboard} />
                            <AdminRoute path="/admin/product/add/" exact component={AddProduct} />
                            <AdminRoute path="/admin/product/manage/" exact component={ManageProducts} />
                            <AdminRoute path="/admin/category/manage" exact component={ManageCategories} />
                            <AdminRoute path="/admin/user/manage" exact component={ManageUsers} />

                            <ProtectedRoute path="/user/dashboard/" exact component={UserDashboard} />

                        </Switch>
                    </div>
                    <Footer />
                </ThemeContext.Provider>
            </BrowserRouter>
        </div>
    )
}

export default Routes
