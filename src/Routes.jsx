import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Contact from "./pages/Contact/Contact";

export const PageRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Navigate to="/spotifyer.io/Home" replace/>} />
                    <Route path="/spotifyer.io/Home" element={<Home />} />
                    <Route path="/spotifyer.io/Profile" element={<Profile />} />
                    <Route path="/spotifyer.io/Login" element={<Login />} />
                    <Route path="/spotifyer.io/Contact" element={<Contact />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </>
    )
}