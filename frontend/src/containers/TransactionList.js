import { useEffect, useState } from "react";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImageBox from "../components/ImageBox";
import { fetchTransactions } from "../redux/modules/transaction";

export default function TransactionList() {
    const [isLogin, setIsLogin] = useState(false);
    const [successFetch, setSuccessFetch] = useState(false);
    const { user: userLogin } = useSelector((s) => s.user.userLogin);

    useEffect(() => {
        if (!userLogin || !userLogin._id) {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }, [userLogin]);

    const { loading, success, error, transactions } = useSelector(
        (s) => s.transaction.fetchTX
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const cancelTransactionHandler = (e) => {
        console.log("cancelTransactionHandler...");
    };
    return (
        <>
            <Link className="btn btn-warning my-2" to="/">
                GO BACK
            </Link>
            <h3>Your Transaction List</h3>

            {!transactions || !transactions.length ? (
                <Alert variant="warning">
                    You don't have any transactions yet!
                </Alert>
            ) : (
                <>
                    <Table className="table__sm_hide" responsive striped hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Item is changed</th>
                                <th>Status</th>
                                <th>Image</th>
                                <th>The item you want</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((item, _id) => (
                                <>
                                    <tr>
                                        <td>
                                            <ImageBox
                                                image={
                                                    item.buyer.user._id ===
                                                    userLogin._id
                                                        ? item.buyer.item.image
                                                        : item.seller.item.image
                                                }
                                                height="80px"
                                                width="80px"
                                            />
                                        </td>
                                        <td>
                                            {item.buyer.user._id ===
                                            userLogin._id
                                                ? item.buyer.item.title
                                                : item.seller.item.title}
                                        </td>
                                        <td>{item.transactionStatus}</td>
                                        <td>
                                            <ImageBox
                                                image={
                                                    item.buyer.user._id ===
                                                    userLogin._id
                                                        ? item.buyer.item.image
                                                        : item.seller.item.image
                                                }
                                                height="80px"
                                                width="80px"
                                            />
                                        </td>
                                        <td>
                                            {item.buyer.user._id ===
                                            userLogin._id
                                                ? item.buyer.item.title
                                                : item.seller.item.title}
                                        </td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                onClick={
                                                    cancelTransactionHandler
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </td>
                                    </tr>
                                </>
                            ))}
                            {/* {transactions.map((item, _id) => (
                                <>
                                    <tr>
                                        <td>
                                            <ImageBox
                                                image={
                                                    item.buyer.user._id ===
                                                    userLogin._id
                                                        ? item.buyer.item.image
                                                        : item.seller.item.image
                                                }
                                                height="80px"
                                                width="80px"
                                            />
                                        </td>
                                        <td>
                                            {item.buyer.user._id ===
                                            userLogin._id
                                                ? item.buyer.item.title
                                                : item.seller.item.title}
                                        </td>
                                        <td>{item.transactionStatus}</td>
                                        <td>
                                            <ImageBox
                                                image={
                                                    item.buyer.user._id ===
                                                    userLogin._id
                                                        ? item.buyer.item.image
                                                        : item.seller.item.image
                                                }
                                                height="80px"
                                                width="80px"
                                            />
                                        </td>
                                        <td>
                                            {item.buyer.user._id ===
                                            userLogin._id
                                                ? item.buyer.item.image
                                                : item.seller.item.title}
                                        </td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                onClick={
                                                    cancelTransactionHandler
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </td>
                                    </tr>
                                </>
                            ))} */}
                        </tbody>
                    </Table>
                </>
            )}

            {/* {!transactions || !transactions.length ? (
                <Alert variant="warning">
                    You have not requested any changes yet!
                </Alert>
            ) : (
                <>
                    {transactions.map((item, _id) => (
                        <Container>
                            <div className="border-bottom table__md_hide">
                                <div className="row row-cols-xs-2 row-cols-sm-3 row-cols-md-6">
                                    <div className="col-md-1 mb-2">
                                        <div className="row">Image</div>
                                        <div className="row">
                                            <ImageBox
                                                image={
                                                    item.buyer.user._id ===
                                                    userLogin._id
                                                        ? item.buyer.item.image
                                                        : item.seller.item.image
                                                }
                                                height="80px"
                                                width="80px"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row">Your stuff</div>
                                        <div className="row">
                                            {item.buyer.user._id ===
                                            userLogin._id
                                                ? item.buyer.item.title
                                                : item.seller.item.title}{" "}
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="row">Status</div>
                                        <div className="row">
                                            {item.transactionStatus}
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="row">Image</div>
                                        <div className="row">
                                            <ImageBox
                                                image={
                                                    item.buyer.user._id ===
                                                    userLogin._id
                                                        ? item.buyer.item.image
                                                        : item.seller.item.image
                                                }
                                                height="80px"
                                                width="80px"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row">Your wishlist</div>
                                        <div className="row">
                                            {item.buyer.user._id ===
                                            userLogin._id
                                                ? item.buyer.item.title
                                                : item.seller.item.title}
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="row">Actions</div>
                                        <div className="row">
                                            <Button
                                                variant="warning"
                                                onClick={
                                                    cancelTransactionHandler
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    ))}
                </>
            )} */}
        </>
    );
}
