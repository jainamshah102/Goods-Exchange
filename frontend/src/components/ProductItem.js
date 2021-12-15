import { useEffect, useState } from 'react'
import { Badge, Card, Col, Row, Toast } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createLike } from '../redux/modules/product'
import ImageBox from './ImageBox'
import TradeModal from './TradeModal'

export default function ProductItem(props) {
  const {
    numComments,
    numLikes,
    _id,
    title,
    likes,
    location,
    image,
    user: sellerId,
  } = props.product

  const [isLiked, setIsLiked] = useState(false)

  const [show, setShow] = useState(false)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const { user } = useSelector((s) => s.user.userLogin)

  useEffect(() => {
    if (!user) {
      setIsLiked(false)
    } else if (!likes.find((x) => x.user === user._id)) {
      setIsLiked(false)
    } else {
      setIsLiked(true)
    }
  }, [user, likes])

  const likeHandler = (e) => {
    if (!user) {
      setMessage('You must login to like it!')
      setShow(true)
    } else if (isLiked) {
      setMessage('You have already liked it!')
      setShow(true)
    } else {
      setIsLiked(true)
      dispatch(createLike(_id, numLikes + 1))
    }
  }

  return (
    <>
      <Card className='mb-4 position-relative'>
        <Link to={`/products/${_id}`}>
          <ImageBox image={image} borderRadius='1.1em 1.1em 0em 0em' />

          <Card.ImgOverlay>
            <Toast
              onClose={() => setShow(false)}
              show={show}
              delay={1000}
              autohide
            >
              <Toast.Header>
                <strong className='mr-auto'>{message}</strong>
              </Toast.Header>
            </Toast>
          </Card.ImgOverlay>
        </Link>

        <Card.Body className='px-3 pb-2 pt-0'>
          <Card.Title className='my-2   post__title'>
            <Link to={`/products/${_id}`}>{title} </Link>
          </Card.Title>

          <Row>
            <Col sm={6} md={12} lg={6} className='pr-1 align-middle'>
              <Card.Text className='mt-0'>
                <div className='align-bottom  post__sub_title'>{location}</div>
              </Card.Text>
            </Col>

            <Col sm={2} xs={2} lg={2} className='pl-2'>
              <Badge className='my-1' variant='primary badge-pill'>
                <Card.Text as='span'>
                  <small>{numComments} </small>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill={numComments ? 'orange' : 'white'}
                    className='bi bi-chat-text-fill'
                    viewBox='0 0 16 16'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z'
                    />
                  </svg>
                </Card.Text>
              </Badge>
            </Col>

            <Col sm={2} xs={2} lg={2} className='pl-1'>
              <Badge className='mt-1' variant='primary badge-pill'>
                <Card.Text as='span'>
                  <small>{numLikes} </small>
                  {
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill={numLikes ? 'orange' : 'white'}
                      className='bi bi-heart'
                      viewBox='0 0 16 16'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
                      />
                    </svg>
                  }
                </Card.Text>{' '}
              </Badge>
            </Col>

            <Col sm={2} xs={2} lg={2} className='pl-1 pr-1'>
              <Badge
                onClick={likeHandler}
                className='mt-1'
                variant={`${isLiked ? 'danger' : 'info'} badge-pill`}
              >
                <Card.Text>
                  {
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='white'
                      className='bi bi-hand-thumbs-up-fill'
                      viewBox='0 0 16 16'
                    >
                      <path
                        fillRule='evenodd'
                        d='M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z'
                      />
                    </svg>
                  }
                </Card.Text>
              </Badge>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer
          style={{
            borderBottomRightRadius: '1.1em',
            borderBottomLeftRadius: '1.1em',
          }}
        >
          <Row>
            {user && user._id !== sellerId ? (
              <Col className='mb-2' md={6}>
                <TradeModal
                  productId={_id}
                  productImage={image}
                  productTitle={title}
                  userId={user._id}
                />
              </Col>
            ) : (
              ''
            )}
            <Col md={user && user._id !== sellerId ? 6 : 12} className='mb-2'>
              <Link
                className='btn btn-block btn-primary'
                to={`/products/${_id}`}
              >
                Details
              </Link>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </>
  )
}
