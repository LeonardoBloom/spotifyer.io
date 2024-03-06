import React from 'react'
import NavBar from './NavBar'
import './Profile.css';
import { Link } from 'react-router-dom';


const Profile = ({userInfo, tracks, artistas, playlists}) => {

  console.log("playlists in profile: ", playlists)

  function popularityScore(data, quantity) {
    let returnScore = 0;
    for (let x = 0; x < quantity; x++) {
      returnScore += data[x].popularity
    }
    returnScore = returnScore / quantity
    return returnScore
  }
  
  function manageData(data, quantity) {
    let returnData = []
    for(let x=0; x < quantity; x++) {
      returnData.push(`${data[x].name} by ${data[x].artists[0].name}`)
    }
    console.log("data listed: ", returnData)
    return returnData
  }

  function manageArtists(data, quantity) {
    let returnData = []
    for(let x=0; x < quantity; x++) {
      returnData.push(`${data[x].name}`)
    }
    console.log("data listed: ", returnData)
    return returnData
  }

  let TopTracks = []
  let TopArtists = []
  // let TopPlaylists = manageData(playlists.items, 10)
  let popScore = 0

  if (!userInfo.error) {
  TopTracks = tracks.items
  TopArtists = manageArtists(artistas.items, 10)
  // let TopPlaylists = manageData(playlists.items, 10)
  popScore = popularityScore(artistas.items, 20)  
  } else {
    return <>
      <NavBar />
      <p style={{
        textAlign: 'center', 
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        width: '520px',
        margin: '100px auto',
        }}>
        Unable to retrieve user data, try going <Link to='/spotifyer.io/Home'>Home</Link> then logging in with Spotify</p>
    </>
  }



    return (
      <>
      <NavBar />
      
      <div>
        {userInfo ? (
        <>
        <div className='profile'>
          <div className='profile-container'>
            <h2>Welcome, <span style={{color:"cornflowerblue"}}>{userInfo.display_name}</span>!</h2>
            <div className='profile-basic-details'>
              <div className='profile-pic'>
                <img src={userInfo.images[1].url} width={256} height={256} alt='profile_pic' />
              </div>
              <div className='profile-details'>
                <div><span><b># of Followers:</b></span> {userInfo.followers.total}</div><br></br>
                <div><span><b>Email Address:</b></span> {userInfo.email}</div><br></br>
                <div><span><b>Country of Residence:</b></span> <br></br><img title={userInfo.country} src={`https://flagsapi.com/${userInfo.country}/flat/32.png`} alt='country_flag'></img></div>
                <div><span><b>Recent Listening Popularity Score:</b> {popScore}</span></div>
              </div>
            </div>
            <div className='profile-top'>
              <div className='profile-top-songs'>
                <div><h3>Your Top Songs Ever:</h3>
                    <ol>
                      {TopTracks.map(({name, artists}) => (
                        <li key={Math.random() * 10}> <b>{name}</b> by {artists.map(artists => artists.name).join(', ')}</li>
                      ))}
                    </ol>
                </div>
              </div>
              <div className='profile-top-artists'>
                <div><h3>Your Top Artists Ever:</h3>
                      <ol>
                        {TopArtists.map(p => (
                          <li key={p}> {p}</li>
                        ))}
                      </ol>
                  </div>
              </div>
              <div className='profile-top-albums'>

              </div>
            </div>
          </div>
        </div>
          {/* Display other user information as needed */}
        </>
        ) : (
        <p>Loading user profile...</p>
        )}
    </div>
      </>
    )

}

export default Profile