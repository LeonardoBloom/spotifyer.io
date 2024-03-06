import React from 'react'
import logo from '../img/Spotify-logo.png';
import './NavBar.css';
import { Link } from 'react-router-dom';



const NavBar = () => {
    return (
        <>
            <div className="navbar">
                <div className='navItems'>
                    <div className='navLogo'>
                        
                        {/* <img src={logo} height={48} alt='spotify logo'></img> */}
                    </div>
                    <div className='navButtons'>
                        <Link to="/"><button id='home'>Home</button></Link>
                        {/* <button id='about'>About</button> */}
                        <Link to="/spotifyer.io/Contact"><button id='contact'>Contact</button></Link>
                        <Link to="/spotifyer.io/Login"><button className='Login'>Log In</button></Link> 
                        {/* <button className='Login'>Sign Up</button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar