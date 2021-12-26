import { Button, Col, Image, ListGroup, Row, Table } from "react-bootstrap";
import { Rating } from "../components";

const product = [];

export default function TransactionDetails() {
    return (
        <>
            <Button className="my-2" variant="warning">
                Go Back
            </Button>
            <h3>TRANSACTION NUMBER</h3>

            <h4>ITEM RECEIVED</h4>
            <Row>
                <Col lg={4} md={4}>
                    <Image
                        style={{ borderRadius: "1.1em" }}
                        src="mouse.jpg"
                        alt={product.name}
                        fluid
                    ></Image>
                </Col>
                <Col lg={8} md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="py-0">
                            <h4>{product.title}</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {`Langdon is rated`}
                            <Rating value="4" text={` 4/5`} />
                        </ListGroup.Item>
                        <ListGroup.Item>{`Received 12 responses from 23 successful transactions.`}</ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Details : </strong>
                            {product.description}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Location: Mumbai</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    There are 66 people requesting to exchange
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <h4 className="my-3">Item exchanged</h4>
            <Table responsive striped hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Receiver</th>
                        <th>Phone number</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{product._id}</td>
                        <td>{product.title}</td>
                        <td>{product.image}</td>
                        <td>{`nguyen van A`}</td>
                        <td>{`0888666888`}</td>
                        <td>{`Ha noi Ha noi Ha noi Ha noi Ha noi Ha noi`}</td>
                    </tr>
                </tbody>
            </Table>
            <Button className="my-2" variant="warning">
                AGREE TO EXCHANGE
            </Button>
        </>
    );
}
