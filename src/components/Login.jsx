import React from 'react'
import { useEffect, useState } from 'react';
import Profile from './Profile';



const Login = () => {
    const [userProfile, setUserProfile] = useState(null);

    const [tracks, setTracks] = useState(null);
    const [artists, setArtists] = useState(null);
    const [playlists, setPlaylists] = useState(null);


    
    // useEffect(() => {
    //     const responser = async () => n{
    //         const responsed = await GetProfile
    //         userProfile = await responsed();
    //     }
    //     responser()
        
    // }, [0])

    
    useEffect(() => {

        try {
            const GetProfile = async () => {
                const clientId = "7eedacef6955442a99007fcd1956ec94"; // Get your own client id from https://developer.spotify.com/documentation/web-api
                const params = new URLSearchParams(window.location.search)
                const code = params.get("code");
                
                        if (!code) {
                            redirectToAuthCodeFlow(clientId);
                        } else {
                            const accessToken = await getAccessToken(clientId, code);

                            const profile = await fetchProfile(accessToken);
                            console.log("profile in worker: ", profile);

                            const playlist = await fetchPlaylists(accessToken);
                            console.log("playlists in worker: ", playlist)

                            const track = await fetchTracks(accessToken);
                            console.log("tracks in worker: ", track)

                            const artist = await fetchArtists(accessToken);
                            console.log("artists in worker:", artist); 

                            // send data to web page
                            setPlaylists(playlist)
                            setTracks(track)
                            setArtists(artist)
                            setUserProfile(profile)
                        }
                    }
                    
            const getAccessToken = async (clientId, code) => {
            
                const verifier = localStorage.getItem("verifier");
            
                const params = new URLSearchParams();
                params.append("client_id", clientId);
                params.append("grant_type", "authorization_code");
                params.append("code", code);
                params.append("redirect_uri", "http://localhost:3000/spotifyer.io/Login");
                // params.append("redirect_uri", "http://localhost:3000/Login");
                params.append("code_verifier", verifier);
            
                try {
                    const result = await fetch("https://accounts.spotify.com/api/token", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: params
                    });
                
                    const { access_token } = await result.json();
                    return access_token;
                } catch (error) {
                    console.log("message: ", error)
                }
            };
            
            async function fetchProfile(token) {
                const result = await fetch("https://api.spotify.com/v1/me", {
                    method: "GET", headers: { Authorization: `Bearer ${token}` }
                });
            
                return await result.json();
            }
    
            async function fetchPlaylists(token) {
                const response = fetch('https://api.spotify.com/v1/me/playlists', {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                const item = await response;
                return item.json()
            }
            async function fetchTracks(token) {

                const params = new URLSearchParams()
                // short_term == LAST 4 WEEKS
                // medium_term == LAST 6 MOTHS (default)
                // long_term == ALLTIME
                params.append("time_range", 'long_term')

                const response = fetch(`https://api.spotify.com/v1/me/top/tracks?${params}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                const item = await response;
                return item.json()
            }
            async function fetchArtists(token) {
                
                const params = new URLSearchParams()
                // short_term == LAST 4 WEEKS
                // medium_term == LAST 6 MOTHS (default)
                // long_term == ALLTIME
                params.append("time_range", 'long_term')

                const response = fetch(`https://api.spotify.com/v1/me/top/artists?${params}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                const item = await response;
                return item.json()
            }
    
            async function redirectToAuthCodeFlow(clientId) {
                const verifier = generateCodeVerifier(128);
                const challenge = await generateCodeChallenge(verifier);
            
                localStorage.setItem("verifier", verifier);
            
                const params = new URLSearchParams();
                params.append("client_id", clientId);
                params.append("response_type", "code");
                params.append("redirect_uri", "http://localhost:3000/spotifyer.io/Login");
                // params.append("redirect_uri", "http://localhost:3000/Login");
                params.append("scope", "user-top-read user-read-private user-read-email");
                params.append("code_challenge_method", "S256");
                params.append("code_challenge", challenge);
            
                document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
            }
            
            function generateCodeVerifier(length) {
                let text = '';
                let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            
                for (let i = 0; i < length; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }
            
            async function generateCodeChallenge(codeVerifier) {
                const data = new TextEncoder().encode(codeVerifier);
                const digest = await window.crypto.subtle.digest('SHA-256', data);
                return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
                    .replace(/\+/g, '-')
                    .replace(/\//g, '_')
                    .replace(/=+$/, '');
            }
    
            GetProfile();

        } catch (error) {
            console.log("Could Not Fetch Profile")
        }



}, []);

    if (userProfile) {
        console.log("sending profile: ", userProfile)
        console.log("sending playlists: ", playlists)
        return (
            <>
                <Profile 
                userInfo={userProfile} 
                playlists={playlists} 
                tracks={tracks} 
                artistas={artists} />
            </>
        );
    } else {
        return (
            <>
                <p> Fetching Spotify Profile...</p>
            </>
        )
    }
};

export default Login;
