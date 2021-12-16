import { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { register, REGISTER_RESET } from '../../redux/modules/user'

export default function UserRegister() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const history = useHistory()
  const userLogin = useSelector((stage) => stage.user.userLogin)
  const dispatch = useDispatch()

  const { error, isSuccess, loading } = useSelector(
    (state) => state.user.userRegister
  )

  useEffect(() => {
    if (isSuccess) {
      setMessage('Successfully Signed Up!')
      history.push('/login')
      dispatch({ type: REGISTER_RESET })
    }

    if (userLogin.user) {
      history.push('/')
    }
  }, [dispatch, isSuccess, history, userLogin.user])

  const registerHandler = (e) => {
    setMessage('')
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password does not match.')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <>
      <Row className='justify-content-center mt-4 pt-5'>
        <Col md={4}>
          <h3>REGISTER</h3>
          {loading && <Spinner animation='border' variant='primary' />}
          {error && <Alert variant='warning'>{error}</Alert>}
          {message && <Alert variant='green'>{message}</Alert>}
          <Form onSubmit={registerHandler}>
            <Form.Group controlId='Name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
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
            <Button className='btn-block' type='submit'>
              REGISTER
            </Button>
          </Form>
          <Form.Text>
            <Row className='py-3'>
              <Col>
                Have account? <Link to={'/login'}>Login</Link>
              </Col>
            </Row>
          </Form.Text>
        </Col>
      </Row>
    </>
  )
}
