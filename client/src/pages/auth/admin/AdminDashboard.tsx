import { useContext } from 'react'
import { FaThList,FaUserCog } from 'react-icons/fa'
import { BiMessageSquareAdd } from 'react-icons/bi'
import { BsGearFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { getTheme } from '../../../theme/Apptheme'
import { ThemeContext } from '../../../theme/Context'
import { isAuthenticated } from '../helper/auth.helper'


interface AdminOption {
    icon: typeof BiMessageSquareAdd
    name: string,
    path: string
}
const adminOptions: AdminOption[] = [
    {
        icon: BiMessageSquareAdd,
        name: "Add Products",
        path: "/admin/product/add"
    },
    {
        icon: BsGearFill,
        name: "Manage Products",
        path: "/admin/product/manage"
    },
    {
        icon:FaThList,
        name: "Manage Categories",
        path: "/admin/category/manage"
    },
    {
        icon:FaUserCog,
        name: "Manage Users",
        path: "/admin/user/manage"
    }
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
                        <Link className={`card mx-auto my-2 ${bootstrap.cardBackground} ${bootstrap.textColor}`} to={option.path} style={{ width: "250px",textDecoration:"none" }}>
                            <div className="card-body">
                                {option.icon({})}
                                <p className="card-text mt-3">{option.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
