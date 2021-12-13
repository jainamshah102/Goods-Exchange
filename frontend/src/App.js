import { config } from "dotenv";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NotFound from "./components/pages/NotFound";
import { useState, useEffect } from "react";
import UserContext from "./context/UserContext";
import ListProduct from "./components/ListProduct";
import Chat from "./components/Chat";
import About from "./components/About";

config();

function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            console.log(process.env.API_URL);
            let token = localStorage.getItem("token");

            if (token === null) {
                localStorage.setItem("token", "");
                token = "";
            }
            const tokenResponse = await (
                await fetch(`http://localhost:8000/user/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": token.toString(),
                    },
                })
            ).json();

            if (tokenResponse && tokenResponse.success) {
                setUserData({
                    token,
                    user: tokenResponse.user,
                });
                
            }
        };

        checkLoggedIn();
    }, []);

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ userData, setUserData }}>
                <h1>{JSON.stringify(userData)}</h1>
                <Route exact path="/about">
            <About/>
          </Route>
                <Switch>
                    <Route exact path="/" component={Home}></Route>

                    <Route exact path="/login">
                        <Login></Login>
                    </Route>

                    <Route exact path="/register">
                        <Register></Register>
                    </Route>

                    <Route exact path="/logout"></Route>

                    {/* <Route path="*">
                        <NotFound></NotFound>
                    </Route> */}
                </Switch>
          <Route exact path="/chat">
            <Chat/>
          </Route>
            </UserContext.Provider>
                <Route exact path="/product/viewProduct">
            <ListProduct/>
          </Route>
        </BrowserRouter>
    );
}

export default App;
