import { useEffect, useState } from 'react'
import { Alert, Button, ButtonGroup, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ImageBox from '../components/ImageBox'
import { fetchRequests } from '../redux/modules/product'

export default function RequestTo() {
  // eslint-disable-next-line
  const [isLogin, setIsLogin] = useState(false)
  // eslint-enable-next-line
  const { user: userLogin } = useSelector((s) => s.user.userLogin)
  useEffect(() => {
    if (!userLogin || !userLogin._id) {
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }
  }, [userLogin])

  const { requests } = useSelector((s) => s.product.fetchRequests)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRequests())
  }, [dispatch])
  // 1 get all products of userLogin._id === item.user
  // 2 get all products tradeTo not null

  const cancelRequestHandler = (e) => {
    console.log('cancelRequestHandler...')
  }
  return (
    <>
      <Link className='btn btn-warning my-2' to='/'>
        GO BACK
      </Link>
      <h3>LIST OF EXCHANGE REQUIREMENTS</h3>
      {!requests || !requests.length ? (
        <Alert variant='warning'>You don't have any exchange requests yet!</Alert>
      ) : (
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Item exchanged</th>
              <th>Image</th>
              <th>Status</th>
              <th>The item you want</th>
              <th>Image</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item, _id) => (
              <>
                <tr>
                  <td>{item.title}</td>
                  <td>
                    <ImageBox image={item.image} height='80px' />
                  </td>
                  <td>{item.tradeTo.status ? 'Wait' : 'Cancelled'}</td>
                  <td>{item.tradeTo.title}</td>
                  <td>
                    <ImageBox image={item.tradeTo.image} height='80px' />
                  </td>
                  <td>
                    <ButtonGroup aria-label='Basic example'>
                      <Button
                        variant='secondary'
                        onClick={cancelRequestHandler}
                      >
                        Cancel
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
