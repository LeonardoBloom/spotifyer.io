import React from 'react'
import NavBar from '../components/NavBar'
import './Home.css';
import { Link } from 'react-router-dom';
import logopic from '../img/Spotify-logo.png';

const Home = () => {
    return (
    <>
        <NavBar />
        <div className='container'>
            <div className='content'>
                <h1>Welcome to Leo's Spotifyer</h1>
                <p>Here you can have a look at some cool stats about your Spotify activity
                </p>
                <p>
                    Just Log in and check it out. Surely it won't hurt you 😈
                </p>
                <div className='content-login'>
                    <Link to="/spotifyer.io/Login"><button><p>Log In with Spotify</p> <img src={logopic} width={60} alt='spotify_logo'></img> </button></Link>
                </div>
            </div>

        </div>
    </>
    )
}

export default Home