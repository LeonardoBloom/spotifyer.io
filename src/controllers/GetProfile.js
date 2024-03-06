
import { redirectToAuthCodeFlow } from "./redirectToAuthCodeFlow";

export const GetProfile = async () => {
    const clientId = "7eedacef6955442a99007fcd1956ec94";
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code");
    
            if (!code) {
                redirectToAuthCodeFlow(clientId);
            } else {
                const accessToken = await getAccessToken(clientId, code);
                const profile = await fetchProfile(accessToken);
                console.log("profile in worker: ", profile);
                // send data to web page
                return await profile
            }
}

export const getAccessToken = async (clientId, code) => {

    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/Login");
    params.append("code_verifier", verifier);


    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
};

export async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}