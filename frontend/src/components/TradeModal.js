import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  createRequest,
  fetchMyList,
  fetchRequests,
} from '../redux/modules/product'
import ImageBox from './ImageBox'

const TradeModel = ({ productTitle, productImage, productId, userId }) => {
  const [giveAwayItemId, setGiveAwayItemId] = useState('')
  const [giveAwayItem, setGiveAwayItem] = useState([])
  const [show, setShow] = useState(false)

  const { products } = useSelector((s) => s.product.myProductList)
  const dispatch = useDispatch()
  useEffect(() => {
    if (show) {
      dispatch(fetchMyList(userId, true))
    }
  }, [dispatch, show, userId])

  const changeHandler = async ({ target: { value } }) => {
    await setGiveAwayItemId(value)
    const result = products.filter((item) => item._id === value)
    await setGiveAwayItem(result)
  }

  const tradeHandler = async (e) => {
    e.preventDefault()
    await dispatch(
      createRequest(giveAwayItemId, productImage, productTitle, productId)
    )
    await dispatch(fetchRequests())
    await setShow(false)
  }
  return (
    <>
      <Button
        className='btn-block'
        variant='warning'
        onClick={() => setShow(true)}
      >
        Change now
      </Button>

      <Modal
        dialogClassName='modal-30w'
        show={show}
        onHide={() => setShow(false)}
      >
        <Form onSubmit={tradeHandler}>
          {show && products.length ? (
            <>
              <Modal.Header closeButton>
                <Modal.Title>Select the item you want to exchange</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId='formGridState'>
                  <Form.Control as='select' onChange={changeHandler}>
                    <option selected>Choose ...</option>
                    {products.map((item) => (
                      <option value={item._id}>{item.title}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                {!giveAwayItem.length ? (
                  <></>
                ) : (
                  <>
                    <Container>
                      <Row className='border-bottom py-1'>
                        <Col xs md>
                          <strong>Title</strong>
                        </Col>
                        <Col xs={4} md={4}>
                          <strong>Image</strong>
                        </Col>
                      </Row>
                      {giveAwayItem.map((item) => (
                        <Row className='pt-2 pb-0'>
                          <Col xs md>
                            {item.title}
                          </Col>
                          <Col xs={4} md={4}>
                            <ImageBox image={item.image} height='80px' />
                          </Col>
                        </Row>
                      ))}
                    </Container>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={() => setShow(false)}>
                  Cancel
                </Button>
                <Button variant='primary' type='submit'>
                  Send
                </Button>{' '}
              </Modal.Footer>
            </>
          ) : (
            <>
              <Modal.Header closeButton>
                <Modal.Title>You have nothing to exchange!</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button variant='secondary' onClick={() => setShow(false)}>
                  Turn off
                </Button>
              </Modal.Footer>
            </>
          )}
        </Form>
      </Modal>
    </>
  )
}

export default TradeModel
