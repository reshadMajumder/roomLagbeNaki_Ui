import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Spinner, Alert } from 'react-bootstrap';
import B_URL from '../Services/Api';

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await axios.get(`${B_URL}/api/user/${userId}/`);
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="d-flex justify-content-center mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="d-flex justify-content-center m-5">
            <Card style={{ width: '18rem' ,height:'23rem' }} className="shadow">
                <Card.Body>
                    <Card.Title>User Profile</Card.Title>
                    <Card.Text>
                        <strong>ID:</strong> {userInfo.id}
                    </Card.Text>
                    <Card.Text>
                        <strong>Username:</strong> {userInfo.username}
                    </Card.Text>
                    <Card.Text>
                        <strong>Email:</strong> {userInfo.email}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfilePage;
