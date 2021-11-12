import React from 'react'
import {Link} from "react-router-dom";
const Home = () => {
    return (
        <div>
            This is Home
            <Link className="btn btn-primary mx-1" exact path="/product/viewProduct" role="button">View Products</Link>
        </div>
    )
}

export default Home
