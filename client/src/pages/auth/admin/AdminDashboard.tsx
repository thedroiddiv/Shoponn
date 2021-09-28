import { useContext } from 'react'
import { FiInstagram } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { getTheme } from '../../../theme/Apptheme'
import { ThemeContext } from '../../../theme/Context'
import { isAuthenticated } from '../helper/auth.helper'


interface AdminOption {
    name: string,
    path: string
}
const adminOptions: AdminOption[] = [
    {
        name: "Add Products",
        path: "/admin/product/add"
    },
    {
        name: "Manage Products",
        path: "/admin/product/manage"
    },
    {
        name: "Manage Categories",
        path: "/admin/category/manage"
    },
]

function AdminDashboard() {

    const { bootstrap } = getTheme(useContext(ThemeContext)[0])
    const user = isAuthenticated()

    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor} text-center `} style={{ minHeight: "75vh" }}>
            <div className="container col-10 pt-5">
                <h3>Hello {user?.lastName}! Manage everything here</h3>
                <div className="row pt-4 align-text-bottom">
                    {adminOptions.map(option => (
                        <Link className={`card mx-auto my-2 ${bootstrap.backgroundColor} ${bootstrap.textColor}`} to={option.path} style={{ width: "250px",textDecoration:"none" }}>
                            <div className="card-body">
                                <FiInstagram />
                                <p className="card-text">{option.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
