import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Table, Button } from 'react-bootstrap';
import { listUsers } from '../actions/userActions';
const UserListScreen = () => {
  const dispatch = useDispatch();
  // Getting the list of users from state
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const deleteHandler = (id) => {
    console.log(`delete ID ${id}`);
  };
  return (
    <>
      <h1>Users</h1>
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
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <th>{user._id}</th>
                <th>{user.name}</th>
                <th>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </th>
                <th>
                  {user.isAdmin ? (
                    <i
                      className='fa fa-check'
                      style={{ color: 'green' }}
                      aria-hidden='true'></i>
                  ) : (
                    <i
                      className='fa fa-times'
                      style={{ color: 'red' }}
                      aria-hidden='true'></i>
                  )}
                </th>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit    '></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}>
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

export default UserListScreen;
