import { useEffect } from 'react'
import { Button, ButtonGroup,  Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ImageBox from '../../components/ImageBox'
import { fetchMyList } from '../../redux/modules/product'

export default function ProductList() {
  const { user: userLogin } = useSelector((s) => s.user.userLogin)

  const {  products } = useSelector(
    (s) => s.product.myProductList
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchMyList(userLogin._id, false))
  }, [dispatch, userLogin])

  return (
    <>
      <Link className='btn btn-warning my-2' to='/'>
        GO BACK
      </Link>
      <h3>PRODUCT LIST</h3>

      <Table responsive striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            
            <th>Request number</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, _id) => (
            <tr>
              <td xs={4}>{item.title}</td>
              <td>
                <ImageBox image={item.image} height='80px' />
              </td>
              <td>
                <Link to={`/products/${item._id}`}>
                  <strong>{item.numRequests}</strong>
                </Link>
              </td>
              <td>
                <ButtonGroup aria-label='Basic example'>
                  <Button variant='secondary' className='mr-1'>
                    Cancel
                  </Button>
                  <Link
                    className='btn btn-secondary'
                    to={`/products/${item._id}/edit`}
                  >
                    Fix
                  </Link>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
