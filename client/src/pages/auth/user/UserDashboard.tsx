import React, { useContext } from 'react'
import { getTheme } from '../../../theme/Apptheme'
import { ThemeContext } from '../../../theme/Context'
import { isAuthenticated } from '../helper/auth.helper'
import avatar from 'animal-avatar-generator'
import Parser from 'html-react-parser';
import { ListGroup } from 'react-bootstrap'



function UserDashboard() {
    const { bootstrap } = getTheme(useContext(ThemeContext)[0])
    const user = isAuthenticated();
    const svg = avatar(user ? user.firstName : "random", { size: 96 })


    return (
        <div className={`${bootstrap.backgroundColor} ${bootstrap.textColor}`} style={{ minHeight: "70vh" }}>

            <div className="container row text-center pt-5">
                <div className="col-lg-5 mt-5">
                    <div className="container text-center">
                        <>{Parser(svg)}</>
                        <h5 className="mt-3">{user?.firstName} {user?.lastName}</h5>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <div className="col-lg-7">
                    <h4>Your recent orders</h4>
                    <ListGroup className={`mt-5`}>
                        {[1, 2, 3, 4, 4].map(_ => (
                            <ListGroup.Item className={`${bootstrap.cardBackground}`}>
                                lorem ipsum
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard
