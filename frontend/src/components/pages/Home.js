import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar";
import UserContext from "../../context/UserContext";

const Home = () => {
    const { userData, setUserData } = useContext(UserContext);

    return (
        <div>
            <Navbar></Navbar>
            {userData.user ? (
                <h1>Welcome to home page</h1>
            ) : (
                <h2>You are not logged in</h2>
            )}
        </div>
    );
};

export default Home;
