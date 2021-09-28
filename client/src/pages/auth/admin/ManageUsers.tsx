import { useContext, useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import { getAllUsers } from "../../../data/api/adminApiCalls"
import { User } from "../../../data/models/User"
import { getTheme } from "../../../theme/Apptheme"
import { ThemeContext } from "../../../theme/Context"
import { getToken, isAuthenticated } from "../helper/auth.helper"


function ManageUsers() {


    const { bootstrap } = getTheme(useContext(ThemeContext)[0])
    const [users, setUsers] = useState<User[]>([])
    const user = isAuthenticated()
    const token = getToken()

    const loadData = () => {
        if (user != null) {
            getAllUsers(user._id, token)
                .then(res => {
                    console.log(res);
                    setUsers(res as User[]);
                })
                .catch(error => console.log(`ManageUsers/loadData/ ${error}`)
                )
        }
    }

    useEffect(() => { loadData() })

    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor}`} style={{ minHeight: "75vh" }}>
            <div className="row">
                <h3 className="text-center py-3">All Users</h3>
                {users.map((user: User) => (
                    <div className="card p-4 mx-auto my-2 text-center" style={{ maxWidth: "250px" }}>
                        <span className="mb-3"><FaUser /></span>
                        <h6><strong>Name:</strong> {user.firstName} {user.lastName}</h6>
                        <h6><strong>Email:</strong> {user.email}</h6>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ManageUsers
