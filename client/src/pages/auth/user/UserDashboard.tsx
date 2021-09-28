import React, { useContext } from 'react'
import { getTheme } from '../../../theme/Apptheme'
import { ThemeContext } from '../../../theme/Context'

function UserDashboard() {
    const { bootstrap } = getTheme(useContext(ThemeContext)[0])


    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor}`} style={{ minHeight: "70vh" }}>
            <h2>User</h2>
        </div>
    )
}

export default UserDashboard
