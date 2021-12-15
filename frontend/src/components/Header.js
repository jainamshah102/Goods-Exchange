import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import { logout } from '../redux/modules/user'
import SearchBox from './SearchBox'

export default function Header() {
  const { user } = useSelector((state) => state.user.userLogin)
  const history = useHistory()
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
    history.push('/')
  }
  return (
    <header>
      <Navbar fixed='stick' bg='primary' variant='dark' expand='lg'>
        <Container>
          <IndexLinkContainer to='/'>
            <Navbar.Brand>
              <div className='logo__text mb-0'>Goods Exchange</div>
            </Navbar.Brand>
          </IndexLinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox />
            <Nav className='ml-auto menu__text'>
              {!user ? (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to='/products/create'>
                    <Nav.Link>Create New Post</Nav.Link>
                  </LinkContainer>

                  <NavDropdown title={user.name} id='basic-nav-dropdown'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>My Profile</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/products'>
                      <NavDropdown.Item>My Products</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/requests'>
                      <NavDropdown.Item>My Requests</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/transactions'>
                      <NavDropdown.Item>My Transactions</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Divider />

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
