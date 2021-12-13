import { useContext } from "react";
import Header from "../layout/Header";
import UserContext from "../../context/UserContext";

const Home = () => {
    const { userData, setUserData } = useContext(UserContext);

    return (
        <div>
            <Header></Header>
            {userData.user ? (
                <h1>Welcome to home page</h1>
            ) : (
                <h2>You are not logged in</h2>
            )}
        </div>
    );
};

export default Home;
