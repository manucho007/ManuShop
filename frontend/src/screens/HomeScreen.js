import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { Col, Row } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';

const HomeScreen = ({ match }) => {
  // Check keyword
  const keyword = match.params.keyword;

  // Check page number
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  // Grab the data from state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  // Firing the action
  // useEffect triggers as soon as the component loads
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
