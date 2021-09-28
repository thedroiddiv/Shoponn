import React, { useContext } from 'react'
import { getTheme } from '../../../theme/Apptheme'
import { ThemeContext } from '../../../theme/Context'
import { isAuthenticated } from '../helper/auth.helper'

function ManageProducts() {
    const { bootstrap } = getTheme(useContext(ThemeContext)[0])
    const user = isAuthenticated()
    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor} text-center `} style={{ minHeight: "75vh" }}>
            add cat
        </div>
    )
}

export default ManageProducts
