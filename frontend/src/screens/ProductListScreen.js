import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  // Getting the list of products from state
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  //   Get current logged user from state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push('/login');
    }
  }, [dispatch, userInfo, history]);

  const deleteHandler = (id) => {
    //   Delete Product
    if (window.confirm('Are you sure?')) {
    }
  };

  const createProductHandler = () => {};
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fa fa-plus' aria-hidden='true'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <th>{product._id}</th>
                <th>{product.name}</th>
                <th>$ {product.price}</th>
                <th>{product.category}</th>
                <th>{product.brand}</th>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit    '></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}>
                    <i className='fa fa-trash' aria-hidden='true'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
