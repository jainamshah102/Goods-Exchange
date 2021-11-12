import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import ViewProduct from './components/ViewProduct';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/signup">
            <Signup/>
          </Route>
        </Switch>
        </div>
      <Route exact path="/product/viewProduct">
            <ViewProduct/>
          </Route>
    </Router>
    </>
  );
}

export default App;
