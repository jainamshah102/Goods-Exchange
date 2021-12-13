import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Header from "../layout/Header";
const Login = (props) => {
    const { userData, setUserData } = useContext(UserContext);
    const [message,setMessage] = useState(" ");
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
            // alert("Invalid credentials");
            setMessage('Invalid credentials')
            console.log(message)
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div style={{backgroundColor:"royalblue",height:"92vh"}}>
            <Header/>
            
            <p value={message} style={{color:'black'}}></p>


            <section className="vh-90">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png" className="img-fluid"
          alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form onSubmit={handleSubmit}>
          

          

          {/* <!-- Contact input --> */}
          <div className="form-outline mb-4">
            <input type="text" className="form-control form-control-lg"
              placeholder="Enter a valid contact number" value={credentials.contactNumber} onChange={onChange} id="contactNumber" name="contactNumber"/>
            <label className="form-label" for="form3Example3">Contact Number</label>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-3">
            <input type="password" value={credentials.password} onChange={onChange} name="password" id="password" className="form-control form-control-lg"
              placeholder="Enter password" />
            <label className="form-label" for="form3Example4">Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            {/* <!-- Checkbox --> */}
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body">Forgot password?</a>
          </div>
          {/* padding-left: 2.5rem; padding-right: 2.5rem; */}
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-primary btn-lg"
              style={{paddingLeft:'2.5rem',paddingRight:'2.5rem'}}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                className="link-danger">Register</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
  <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
    {/* <!-- Copyright --> */}
    <div className="text-white mb-3 mb-md-0">
      Copyright © 2021. All rights reserved.
    </div>
    {/* <!-- Copyright --> */}

    {/* <!-- Right --> */}
    
    {/* <!-- Right --> */}
  </div>
</section>
        </div>
    );
};

export default Login;
