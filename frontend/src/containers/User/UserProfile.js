import { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { fetchProfile, updateProfile } from '../../redux/modules/user'

export default function UserProfile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [addressNo, setAddressNo] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [memo, setMemo] = useState('')

  const [message, setMessage] = useState(null)
  const history = useHistory()
  const dispatch = useDispatch()

  const userLogin = useSelector((stage) => stage.user.userLogin)
  const UpdateProfile = useSelector((stage) => stage.user.UpdateProfile)
  const { error, loading, user } = useSelector(
    (stage) => stage.user.userProfile
  )
  const userUpdateProfile = {
    name,
    email,
    password,
    lastName,
    firstName,
    phoneNumber,
    addressNo,
    street,
    city,
    province,
    memo,
  }
  useEffect(() => {
    if (!userLogin || !userLogin.user) {
      history.push('/login')
    } else {
      if (!user) {
        dispatch(fetchProfile())
      } else {
        setName(user.name)
        setEmail(user.email)
        setPassword(user.password)
        setConfirmPassword(user.confirmPassword)
        setLastName(user.shipping.lastName)
        setFirstName(user.shipping.firstName)
        setPhoneNumber(user.shipping.phoneNumber)
        setAddressNo(user.shipping.addressNo)
        setStreet(user.shipping.street)
        setCity(user.shipping.city)
        setProvince(user.shipping.province)
        setMemo(user.shipping.memo)
      }
    }
  }, [dispatch, history, userLogin, user])

  const updateProfileHandler = (e) => {
    setMessage(null)
    e.preventDefault()
    if (!password || !confirmPassword) {
      setMessage('Re-enter the password.')
    } else if (password !== confirmPassword) {
      setMessage('Entered password does not match.')
    } else {
      dispatch(updateProfile(userUpdateProfile))
    }
  }
  return (
    <>
      <Link className='btn btn-warning my-2' to='/'>
        GO BACK
      </Link>

      <h2>ACCOUNT DETAILS</h2>
      {loading && <Spinner animation='border' variant='primary' />}
      {error && <Alert variant='warning'>{error}</Alert>}
      {message && <Alert variant='warning'>{message}</Alert>}
      {UpdateProfile && UpdateProfile.success ? (
        <Alert variant='primary'>Successfully updated!</Alert>
      ) : null}
      <Form onSubmit={updateProfileHandler}>
        <Form.Row>
          <Col md={4}>
            <h4>Login</h4>
            <Form.Group controlId='Name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={({ target: { value } }) => setName(value)}
              />
            </Form.Group>
            <Form.Group controlId='Email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
              />
            </Form.Group>
            <Form.Group controlId='Password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
              />
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={({ target: { value } }) => setConfirmPassword(value)}
              />
            </Form.Group>
          </Col>
          <Col md={8}>
            <h4>Address</h4>
            <Form.Row>
              <Col xs={7} md={6}>
                <Form.Group controlId='lastName'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={({ target: { value } }) => setLastName(value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={5} md={3}>
                <Form.Group controlId='firstName'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='First Name'
                    value={firstName}
                    onChange={({ target: { value } }) => setFirstName(value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={7} md={3}>
                <Form.Group controlId='phoneNumber'>
                  <Form.Label>Phone No</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Phone No'
                    value={phoneNumber}
                    onChange={({ target: { value } }) => setPhoneNumber(value)}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={4}>
                <Form.Group controlId='addressNo'>
                  <Form.Label>Apartment Number</Form.Label>
                  <Form.Control
                    placeholder='Apartment Number'
                    value={addressNo}
                    onChange={({ target: { value } }) => setAddressNo(value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={8}>
                <Form.Group controlId='street'>
                  <Form.Label>Street name</Form.Label>
                  <Form.Control
                    placeholder='Street name'
                    value={street}
                    onChange={({ target: { value } }) => setStreet(value)}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs={6}>
                <Form.Group controlId='city'>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    placeholder='City'
                    value={city}
                    onChange={({ target: { value } }) => setCity(value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId='province'>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    placeholder='State'
                    value={province}
                    onChange={({ target: { value } }) => setProvince(value)}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId='memo'>
                  <Form.Label>Delivery Details</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter any additional delivery details...'
                    value={memo}
                    onChange={({ target: { value } }) => setMemo(value)}
                  />{' '}
                </Form.Group>
              </Col>
            </Form.Row>
          </Col>
          <Button className='ml-auto mr-3' type='submit'>
            Update
          </Button>
        </Form.Row>
      </Form>
    </>
  )
}
