import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Navbar = () => {
    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();

    const login = () => history.push("/login");

    const register = () => history.push("/register");

    const logout = () => {
        setUserData({
            user: undefined,
            token: undefined,
        });

        localStorage.setItem("token", "");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Navbar
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>
                    </ul>
                    {!userData.user ? (
                        <form className="d-flex">
                            <button
                                className="btn btn-primary mr-2"
                                onClick={login}
                            >
                                Login
                            </button>

                            <button
                                className="btn btn-primary mr-2"
                                onClick={register}
                            >
                                Register
                            </button>
                        </form>
                    ) : (
                        <form className="d-flex">
                            <button
                                className="btn btn-primary mr-2"
                                onClick={logout}
                            >
                                LogOut
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
