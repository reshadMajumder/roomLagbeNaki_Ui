import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';

const UserProfilePage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('access');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUserData({
          username: response.data.username,
          email: response.data.email,
        });
      } catch (error) {
        console.error('Error fetching user data:', error.response || error.message);
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('access');
      const response = await axios.put('http://127.0.0.1:8000/api/user/profile/', userData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSuccess('Profile updated successfully');
      setError('');
    } catch (error) {
      console.error('Error updating profile:', error.response || error.message);
      setError('Error updating profile');
      setSuccess('');
    }
  };

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  }

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default UserProfilePage;
