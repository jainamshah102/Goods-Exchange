import Axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Col, Form, ListGroup, ProgressBar, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Rating } from '../../components'
import ImageBox from '../../components/ImageBox'
import { createProduct, CREATE_NEW_RESET } from '../../redux/modules/product'

export default function ProductCreate() {
  const [percentUpload, setPercentUpload] = useState(null)
  const [imageUpload, setImageUpload] = useState()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState('')
  const [wishList, setWishList] = useState('')
  const { user: userLogin } = useSelector((s) => s.user.userLogin)
  const { success, product } = useSelector((s) => s.product.createProduct)
  const dispatch = useDispatch()
  const history = useHistory()

  const uploadImageHandler = async () => {
    try {
      const formData = new FormData()
      formData.append('file', imageUpload)
      formData.append('upload_preset', 'sos-product')
      formData.append('cloud_name', 'longpos')

      const {
        data: { version, public_id, format },
      } = await Axios.request({
        method: 'POST',
        url:
          process.env.REACT_APP_CLOUDINARY_URL_UPLOAD ||
          'https://api.cloudinary.com/v1_1/longpos/upload',
        data: formData,
        onUploadProgress: ({ loaded, total }) => {
          const per = Math.round((loaded / total) * 100)
          setPercentUpload(per)
        },
      })

      await setImage(`/v${version}/${public_id}.${format}`)
    } catch (error) {
      console.log(error)
    }
  }

  const createProductHandler = (e) => {
    e.preventDefault()
    const newProduct = {
      title,
      description,
      location,
      image,
      wishList,
    }
    dispatch(createProduct(newProduct))
  }

  useEffect(() => {
    if (success) {
      history.push(`/products/${product._id}`)
      dispatch({ type: CREATE_NEW_RESET })
    }
  }, [dispatch, history, product, success])
  return (
    <>
      <Link className='btn btn-warning my-2' to='/'>
        GO BACK
      </Link>
      <Form onSubmit={createProductHandler}>
        <h3>CREATE NEW</h3>
        <Row>
          <Col lg={4} md={4}>
            <ImageBox image={image} />

            {percentUpload && (
              <>
                <ProgressBar
                  striped
                  variant='warning'
                  animated
                  label={`${percentUpload}%`}
                  now={percentUpload}
                  className='mt-2'
                />
              </>
            )}
          </Col>
          <Col lg={5} md={5}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder='Title'
                value={title}
                onChange={({ target: { value } }) => setTitle(value)}
              />
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Details</Form.Label>
              <Form.Control
                placeholder='Details'
                value={description}
                onChange={({ target: { value } }) => setDescription(value)}
              />
            </Form.Group>

            <>
              <Form inline>
                <Form.File as='small' className='mb-2'>
                  <Form.File.Input
                    onChange={({ target: { files } }) => {
                      setImageUpload(files[0])
                    }}
                  />
                </Form.File>
                <Button
                  type='button'
                  variant='success'
                  size='sm'
                  onClick={uploadImageHandler}
                >
                  Upload
                </Button>
              </Form>
            </>
          </Col>
          <Col lg={3} md={3}>
            <Form.Group controlId='location'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                placeholder='Location'
                value={location}
                onChange={({ target: { value } }) => setLocation(value)}
              />
            </Form.Group>
            <Form.Group controlId='wishList'>
              <Form.Label>Wishlist</Form.Label>
              <Form.Control
                placeholder='WishList'
                value={wishList}
                onChange={({ target: { value } }) => setWishList(value)}
              />
            </Form.Group>
            <Button type='submit' className='btn-block btn-warning ml-auto'>
              Create New
            </Button>
          </Col>
        </Row>
      </Form>
      <>
        <h3 className='mt-2'>Post Preview</h3>
        <Row>
          <Col lg={4} md={4}>
            <ImageBox image={image} />
          </Col>
          <Col lg={5} md={5}>
            <ListGroup variant='flush'>
              <ListGroup.Item as='h6' className='mb-0 py-2'>
                {title || 'Title'}
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>Location: </strong>
                {location}
              </ListGroup.Item>

              <ListGroup.Item>
                <strong>Details : </strong>
                {description}
              </ListGroup.Item>
              <ListGroup.Item>
                Having <strong>999</strong> change requester
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>WishList: </strong>
                {wishList}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={3} md={3}>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>{`Seller: ${userLogin.name}`}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>{`Evaluate: `}</strong>
                    <Rating value='5' text={` (5/5)`} />
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Receive <strong>999</strong> rating from{' '}
                    <strong>999</strong> successful transaction.
                  </Col>
                </Row>
                <Button disabled className='btn-block my-3' variant='warning'>
                  Request Exchange
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </>
    </>
  )
}
