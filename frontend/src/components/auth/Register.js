import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dob: "",
        contactNumber: "",
        gender: "",
    });
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            firstName,
            lastName,
            email,
            password,
            dob,
            contactNumber,
            gender,
        } = credentials;
        const response = await fetch("http://localhost:8000/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                dob,
                contactNumber,
                gender,
            }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem("token", json.token);
            history.push("/");
        } else {
            alert("Invalid credentials");
        }
    };

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                {/* <div className = "mb-3">
        <label htmlFor = "username" className = "form-label" > Username </label> 
        <input type = "text" className = "form-control" id="username" name="username" onChange = {onChange} aria-describedby="emailHelp" / >
      </div> */}
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        {" "}
                        First Name{" "}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        onChange={onChange}
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                        {" "}
                        Last Name{" "}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        onChange={onChange}
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        {" "}
                        Email{" "}
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={onChange}
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        {" "}
                        Password{" "}
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">
                        {" "}
                        Gender{" "}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="gender"
                        name="gender"
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dob" className="form-label">
                        Date Of Birth
                    </label>
                    <input
                        type="text"
                        className="dob"
                        id="dob"
                        placeholder="Enter your DOB"
                        name="dob"
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">
                        Contact Number
                    </label>
                    <input
                        type="number"
                        className="contactNumber"
                        id="contactNumber"
                        name="contactNumber"
                        placeholder="Enter your Contact Number"
                        onChange={onChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {" "}
                    Submit{" "}
                </button>
            </form>
        </div>
    );
};

export default Signup;
