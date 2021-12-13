import { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../layout/Header";
import UserContext from "../../context/UserContext";

const Home = () => {
    const { userData, setUserData } = useContext(UserContext);
    
    return (
        <>
            <Header></Header>
            {userData.user ? (
                <h1>Welcome to home page</h1>
            ) : (
                <h2>You are not logged in</h2>
            )}
            <Link className="btn btn-primary mx-1" to="/product/viewProduct" role="button">View Products</Link>
            <Link className="btn btn-primary mx-1" to="/product/newProduct" role="button">New Products</Link>
        </>
    );
};

export default Home;
