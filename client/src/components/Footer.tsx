import { useContext } from 'react'
import { IoLogoInstagram, IoLogoTwitter, IoLogoLinkedin } from 'react-icons/io5'
import { getTheme } from '../theme/Apptheme'
import { ThemeContext } from '../theme/Context'



function Footer() {

    const { bootstrap } = getTheme(useContext(ThemeContext)[0])
    const { bgColor, textColor } = bootstrap.footer

    return (
        <div className={`${bgColor} ${textColor} py-3`}>
            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <span>© 2021 Shoponn, Inc</span>
                    </div>
                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3"><a className={textColor} target="_blank" href="https://instagram.com"><IoLogoInstagram /></a></li>
                        <li className="ms-3"><a className={textColor} target="_blank" href="https://twitter.com"><IoLogoTwitter /></a></li>
                        <li className="ms-3"><a className={textColor} target="_blank" href="https://linkedin.com"><IoLogoLinkedin /></a></li>
                    </ul>
                </footer>
            </div>
        </div>
    )
}

export default Footer
