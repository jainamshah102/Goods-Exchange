import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ListProduct = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(
                    "http://localhost:8000/product/listProduct"
                );
                const products = await res.json();
                setProduct(products);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    // console.log(product.products)
    const productlist = product.products;
    console.log(productlist);
    return (
        <>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {(product.products || []).map((prod, index) => (
                            // <li>{prod.description}</li>
                            <div className="col" key={index}>
                                <div className="card shadow-sm">
                                    <svg
                                        className="bd-placeholder-img card-img-top"
                                        width="100%"
                                        height="225"
                                        xmlns={prod.primaryImage}
                                        role="img"
                                        aria-label="Placeholder: Thumbnail"
                                        preserveAspectRatio="xMidYMid slice"
                                        focusable="false"
                                    >
                                        <title>Placeholder</title>
                                        <rect
                                            width="100%"
                                            height="100%"
                                            fill="#55595c"
                                        />
                                        <text
                                            x="50%"
                                            y="50%"
                                            fill="#eceeef"
                                            dy=".3em"
                                        >
                                            {prod.primaryImage}
                                        </text>
                                    </svg>
                                    <div className="card-body">
                                        <p className="card-text">
                                            {prod.title}-
                                            {prod.description.substring(0, 50)}
                                            ...
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-secondary"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-secondary"
                                                >
                                                    <Link to="/chat">Chat</Link>
                                                </button>
                                            </div>
                                            <small className="text-muted">
                                                9 mins
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListProduct;
