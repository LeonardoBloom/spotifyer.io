import React from 'react'
import NavBar from '../../components/NavBar'
import './Contact.css'

const Contact = () => {
  return (
    <>
        <NavBar />

        <div className='contact-info'>
            <div className='name'>
                <h1>Leonardo Colaço</h1>
                <p>(Programmer and cool guy😎) </p>
            </div>
            <br></br>
            <p><b>Leo's Spotifyer</b> was made with REACT.js, retrieving user 
            profile data from the <a href="https://developer.spotify.com/documentation/web-api">
            Spotify Web API</a>, as well as country flags from <a href="https://flagsapi.com/">FlagsAPI</a>.</p>
            {/* <p><b>Privacy Policy:</b><br></br>
            Leo's Spotifyer does not store/retain your data from spotify, it just
            shows statistics about your spotify activity :)
            </p> */}
            <div className='reachme'>
                <p>If you'd like a chat, you can reach me here:</p>
                <div className='reachme-links'>
                    <a href="https://github.com/LeonardoBloom">
                        <i class="devicon-github-original colored"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/leonardocolaco/">
                        <i class="devicon-linkedin-plain colored"></i>
                    </a>
                    <a href="https://leonardobloom.github.io/portfolio-website/"><span>Portfolio</span></a>

                </div>
            </div>
        </div>
    </>
  )
}

export default Contact