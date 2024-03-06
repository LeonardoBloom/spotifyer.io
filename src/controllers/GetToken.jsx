import { useState, useEffect } from 'react';

const GetSpotify = () => {

    const CLIENT_ID = '7eedacef6955442a99007fcd1956ec94'
    const CLIENT_SECRET = 'd1cfff557e14498e8fcbcbd3fc1ad564'
    let token = ''
    let artist_data = {}

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const updateArtist = (key, value) => {
        setData (prevState => ({
            ...prevState,
            [key]: value,
        }));

    }
    
    // useEffect will run once the window is first loaded
    useEffect( () => { 
        // api_request will request for an access token to access api
        const api_request = async () => {
            try {
                const response = await fetch('https://accounts.spotify.com/api/token', 
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
                        },
                        'body':  'grant_type=client_credentials',
                })
                
                const result = await response.json()
                // return access token to the caller
                console.log("token " + result.access_token)
                return result.access_token

            } catch (error) {
                console.log("Failed Token Fetching:" + error)
            } 
        };

        // whoever wants the access token calls it and takes in the access token as a parameter
        const _getArtist = async (token) => {
            try {
                const response = await fetch ('https://api.spotify.com/v1/artists/1AHswQqsDNmu1xaE8KpBne', { // will call COBRAH artist
                    method: 'GET',
                    headers: {'Authorization' : 'Bearer ' + token},
                });
                const result = await response.json()
                console.log(result.name)
                console.log(result.genres)
                updateArtist('Artist Name', result.name);
                updateArtist('Genres', result.genres);
                setLoading(false)
            } catch (error) {
                console.log("Failed getArtist: " + error)
            }
        };

        // request access token, then use the response in it(access_token) as a parameter in desired caller
        api_request().then(token => {
            _getArtist(token)
        })

    }, []);


    // will display loading, until the data is fetched
    if (loading) {
        return <div>Loading...</div>
    } else {
        return (
            <>
                <h1>Data Loaded Successfully</h1>
                <ul>
                    {Object.entries(data).map(([key,value]) => (
                        <li key={key}>
                            <strong>{key} : </strong>
                            <ul>
                                {Array.isArray(value) ? (
                                    value.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))        
                                    ) : ( 
                                    <li>{value}</li> 
                                    )}
                            </ul>
                        </li>
                    ))}
                </ul>
            </>
        );
    };
};


export default GetSpotify;
