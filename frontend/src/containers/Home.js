import { useEffect } from 'react'
import { Alert, Col, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ProductItem from '../components/ProductItem'
import { fetchList } from '../redux/modules/product'

export default function Home() {
  const location = useLocation()

  const keyword = location.pathname.split('/')[2] || ''
  const dispatch = useDispatch()
  const { error, loading, products } = useSelector((s) => s.product.productList)

  useEffect(() => {
    dispatch(fetchList(keyword))
  }, [dispatch, keyword])

  return (
    <>
      <div className='heading__title'>Old Stuff List</div>
      {loading ? (
        <Spinner animation='border' variant='primary' />
      ) : error ? (
        <Alert variant='warning'>{error}</Alert>
      ) : (
        <Row>
          {products.map((item) => (
            <Col md={6} lg={4} key={item._id}>
              <ProductItem product={item} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}
