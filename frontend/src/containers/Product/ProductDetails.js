import { useEffect, useState } from 'react'
import {
  Alert,
  Badge,
  Button,
  Col,
  Form,
  InputGroup,
  ListGroup,
  Row,
  Spinner,
  Toast,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ImageBox from '../../components/ImageBox'
import Rating from '../../components/Rating'
import TradeModal from '../../components/TradeModal'
import {
  createComment,
  CREATE_COMMENT_RESET,
  fetchDetails,
} from '../../redux/modules/product'
import { createTX, fetchTransactions } from '../../redux/modules/transaction'
import convertTime from '../../utils/convertTime'

export default function ProductDetails() {
  const [isLogin, setIsLogin] = useState(false)
  const { user: userLogin } = useSelector((s) => s.user.userLogin)
  useEffect(() => {
    if (!userLogin || !userLogin._id) {
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }
  }, [userLogin])

  const [isSeller, setIsSeller] = useState(false)
  const [text, setText] = useState('')
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState(null)

  const { id: productId } = useParams()

  const dispatch = useDispatch()
  const { error, loading, product } = useSelector(
    (s) => s.product.productDetails
  )
  const { success: successTX } = useSelector((s) => s.transaction.createTX)

  const {
    _id,
    numComments,
    numRequests,
    requestsFrom,
    title,
    description,
    location,
    image,
    comments,
    wishList,
    user,
    userName,
  } = product

  useEffect(() => {
    if (userLogin && product.user) {
      userLogin._id === product.user._id
        ? setIsSeller(true)
        : setIsSeller(false)
    }
  }, [userLogin, product])

  const { success } = useSelector((s) => s.product.createComment)

  const commentHandler = (e) => {
    e.preventDefault()

    if (!text) {
      setMessage("You can't send empty message!")
      setShow(true)
    } else {
      const comment = {
        name: userLogin.name,
        text: text,
        user: userLogin._id,
      }
      dispatch(createComment(productId, comment, numComments + 1))
    }
  }
  const createTXHandler = ({ buyerItemId, sellerItemId }) => {
    dispatch(createTX({ buyerItemId, sellerItemId }))
  }

  useEffect(() => {
    dispatch(fetchDetails(productId))
  }, [dispatch, productId])

  useEffect(() => {
    if (success) {
      setText('')
      dispatch({ type: CREATE_COMMENT_RESET })
    }
  }, [dispatch, success])

  useEffect(() => {
    if (successTX) {
      setMessage('Transaction successful!')
      dispatch(fetchTransactions())
    }
  }, [successTX, dispatch])

  return (
    <>
      <Link className='btn btn-warning my-2' to='/'>
        GO BACK
      </Link>
      {isSeller && (
        <Link
          className='btn btn-success ml-2 my-2'
          to={`/products/${productId}/edit`}
        >
          Edit
        </Link>
      )}

      {loading ? (
        <Spinner animation='border' variant='primary' />
      ) : error ? (
        <Alert variant='warning'>{error}</Alert>
      ) : (
        <>
          <div className='heading__title'>DETAILS</div>
          <Row>
            <Col lg={4} md={4}>
              <ImageBox image={image} />
            </Col>
            <Col lg={5} md={5}>
              <ListGroup variant='flush'>
                <ListGroup.Item className='post__title mb-0 py-2'>
                  {title}
                </ListGroup.Item>

                <ListGroup.Item>
                  <span className='post__sub_title'>Location: </span>
                  {location}
                </ListGroup.Item>

                <ListGroup.Item>
                  <span className='post__sub_title'>Details: </span>
                  {description}
                </ListGroup.Item>
                <ListGroup.Item>
                  Having <span className='post__sub_title'>{numRequests}</span>{' '}
                  change requester
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className='post__sub_title'>Items needed: </span>
                  {wishList}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col lg={3} md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <span className='post__sub_title'>{`Seller: ${userName}`}</span>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <span className='post__sub_title'>{`Evaluate: `}</span>
                      <Rating
                        value={!user ? 0 : user.rating}
                        text={` (${!user ? 0 : user.rating}/5)`}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className='mb-2'>
                      Received{' '}
                      <span className='post__sub_title'>
                        {!user ? 0 : user.numFeedback}
                      </span>{' '}
                      rating from{' '}
                      <span className='post__sub_title'>
                        {!user ? 0 : user.numSuccessTX}
                      </span>{' '}
                      successful transaction.
                    </Col>
                  </Row>
                  {isLogin && !isSeller ? (
                    <TradeModal
                      productId={productId}
                      productImage={image}
                      productTitle={title}
                      userId={userLogin._id}
                    />
                  ) : (
                    <></>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
      <Row>
        <Col md={4} lg={5}>
          <div className='mt-4 heading__sub_title'>COMMENT</div>

          {loading ? (
            <Spinner animation='border' variant='primary' />
          ) : error ? (
            <Alert variant='warning'>{error}</Alert>
          ) : (
            <>
              {numComments ? (
                <ListGroup variant='flush'>
                  {comments.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col centered xs={8} lg={9} className='pl-1'>
                          {item.user === user._id ? (
                            <Badge
                              pill
                              variant='warning'
                              as='span'
                              className='text-dark font-weight-bold m-0  py-1 px-1 align-baseline'
                            >
                              <span className='contain__text_small'>
                                Seller
                              </span>
                            </Badge>
                          ) : (
                            ''
                          )}
                          <span className='post__sub_title ml-1'>
                            {item.name}:{' '}
                          </span>
                          <span>{item.text}</span>
                        </Col>
                        <Col as='small' xs={4} lg={3} className='text-right'>
                          <span className='contain__text_small'>
                            {convertTime(item.createdAt)}
                          </span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Alert variant='danger'>
                  There is no comment. Be the first one to comment.
                </Alert>
              )}
            </>
          )}
          {!isLogin ? (
            <>
              <Alert variant='info'>Please login to comment!</Alert>
            </>
          ) : (
            <>
              <Toast
                onClose={() => setShow(false)}
                show={show}
                delay={2000}
                autohide
              >
                <Toast.Header>
                  <strong className='mr-auto'>{message}</strong>
                </Toast.Header>
              </Toast>
              <Form onSubmit={commentHandler}>
                <InputGroup className='my-2 mr-sm-2'>
                  <Form.Control
                    id='comment'
                    placeholder='Your comment...'
                    value={text}
                    onChange={({ target: { value } }) => setText(value)}
                  />
                  <Button type='submit' className='btn btn-warning ml-1'>
                    Send
                  </Button>
                </InputGroup>
              </Form>
            </>
          )}
        </Col>
        {isLogin && isSeller ? (
          <>
            <Col md={8} lg={7}>
              <div className='mt-4 heading__sub_title'>
                List of exchange requests
              </div>
              {loading ? (
                <Spinner animation='border' variant='primary' />
              ) : error ? (
                <Alert variant='warning'>{error}</Alert>
              ) : (
                <>
                  {numRequests ? (
                    <>
                      <Row className='post__sub_title'>
                        <Col xs={3} md={2}>
                          Image
                        </Col>
                        <Col xs={6} md={4}>
                          Title
                        </Col>
                        <Col xs={{ order: 'last' }} md={2}>
                          Location
                        </Col>
                        <Col xs={{ order: 'last' }} md={2}>
                          Name
                        </Col>
                        <Col xs={3} md={{ order: 'last' }}>
                          Receive
                        </Col>
                      </Row>

                      {requestsFrom.map((request) => (
                        <Row className='border-top py-2'>
                          <Col xs={3} md={2} className='py-2'>
                            <Link to={`/products/${request.item._id}`}>
                              <ImageBox
                                image={request.item.image}
                                height='60px'
                              />
                            </Link>
                          </Col>
                          <Col
                            xs={6}
                            md={4}
                            as='small'
                            className='py-2 post__sub_title'
                          >
                            <Link to={`/products/${request.item._id}`}>
                              {request.item.title}
                            </Link>
                          </Col>
                          <Col
                            xs={{ order: 'last' }}
                            md={2}
                            className='py-2 align-baseline'
                            as='small'
                          >
                            <span>{request.item.location}</span>
                          </Col>
                          <Col
                            xs={{ order: 'last' }}
                            md={2}
                            className='py-2 align-baseline post__sub_title'
                          >
                            <span>{request.item.userName}</span>
                          </Col>
                          <Col
                            xs={3}
                            md={{ order: 'last' }}
                            className='py-2 align-baseline'
                          >
                            <Button
                              size='sm'
                              variant='secondary'
                              onClick={() =>
                                createTXHandler({
                                  buyerItemId: request.item._id,
                                  sellerItemId: _id,
                                })
                              }
                            >
                              OK
                            </Button>
                          </Col>
                        </Row>
                      ))}
                    </>
                  ) : (
                    <Alert variant='danger'>
                      This item has not been requested by anyone.
                    </Alert>
                  )}
                </>
              )}
            </Col>
          </>
        ) : (
          ''
        )}
      </Row>
    </>
  )
}
