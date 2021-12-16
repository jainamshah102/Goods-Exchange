import { useState, useEffect } from 'react'
import { Button, Col, Form, Row, Spinner, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../redux/modules/user'

export default function UserLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const { error, isSuccess, loading, user } = useSelector(
    (stage) => stage.user.userLogin
  )
  const history = useHistory()
  const dispatch = useDispatch()

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
    if (isSuccess) setMessage('Logged in successfully!')
  }

  useEffect(() => {
    if (user) {
      history.push('/')
    }
  }, [user, history])

  return (
    <>
      <Row className='justify-content-center mt-4 pt-5'>
        <Col md={4}>
          <h3>LOGIN</h3>
          {loading && <Spinner animation='border' variant='primary' />}
          {error && <Alert variant='warning'>{error}</Alert>}
          {message && <Alert variant='green'>{message}</Alert>}
          <Form onSubmit={loginHandler}>
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

            <Button type='submit' className='btn-block'>
              LOGIN
            </Button>
          </Form>
          <Form.Text>
            <Row className='py-3'>
              <Col>
                New Customer? <Link to={'/register'}>Register</Link>
              </Col>
            </Row>
          </Form.Text>
        </Col>
      </Row>
    </>
  )
}
