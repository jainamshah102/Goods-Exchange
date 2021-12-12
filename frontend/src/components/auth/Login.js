import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const Login = (props) => {
    const { userData, setUserData } = useContext(UserContext);

    const [credentials, setCredentials] = useState({
        contactNumber: "",
        password: "",
    });
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userRes = await (
            await fetch("http://localhost:8000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contactNumber: credentials.contactNumber,
                    password: credentials.password,
                }),
            })
        ).json();

        if (userRes.success) {
            // Save the auth token and redirect
            localStorage.setItem("token", userRes.token);
            setUserData({
                token: userRes.token,
                user: userRes.user,
            });
            history.push("/");
        } else {
            alert("Invalid credentials");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">
                        Contact Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={credentials.contactNumber}
                        onChange={onChange}
                        id="contactNumber"
                        name="contactNumber"
                        aria-describedby="emailHelp"
                    />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        value={credentials.password}
                        onChange={onChange}
                        name="password"
                        id="password"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
