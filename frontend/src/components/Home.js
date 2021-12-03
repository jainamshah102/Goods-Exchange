import React from 'react'
import {Link} from "react-router-dom";
const Home = () => {
    return (
        <div>
            This is Home
            <Link className="btn btn-primary mx-1" to="/product/viewProduct" role="button">View Products</Link>
            <Link className="btn btn-primary mx-1" to="/product/newProduct" role="button">New Products</Link>
        </div>
    )
}

export default Home
