import React from 'react'
import './NavBarStyles.css'

const NavBar = () => {

    return (
        <div className='navbar navbar-bg'>
                <div className='logo'>
                    <h2>Gridium</h2>
                </div>

                <ul className='nav-menu'>
                    <li><a href="javascript:void(0);">Home</a></li>
                    <li><a href="javascript:void(0);">Reports</a></li>
                </ul>

        </div>
    )
}

export default NavBar