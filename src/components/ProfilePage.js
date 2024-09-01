import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState({});
    const [ads, setAds] = useState([]);

    useEffect(() => {
        // Fetch user info and ads
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get('/api/user'); // Adjust the API endpoint as necessary
                const adsResponse = await axios.get('http://127.0.0.1:8000/api/ads/view/');
                setUserInfo(userResponse.data);
                setAds(adsResponse.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdateInfo = async (event) => {
        event.preventDefault();
        try {
            await axios.put('/api/user', userInfo); // Adjust the API endpoint as necessary
            alert('Information updated successfully');
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    const handleDeleteAd = async (adId) => {
        try {
            await axios.delete(`/api/ads/${adId}`);
            setAds(ads.filter(ad => ad.id !== adId));
        } catch (error) {
            console.error('Error deleting ad:', error);
        }
    };

    const handleUpdateAd = async (adId, updatedAdData) => {
        try {
            await axios.put(`/api/ads/${adId}`, updatedAdData);
            setAds(ads.map(ad => ad.id === adId ? updatedAdData : ad));
        } catch (error) {
            console.error('Error updating ad:', error);
        }
    };

    return (
        <div className="profile-page">
            <h2>Profile Information</h2>
            <Form onSubmit={handleUpdateInfo}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={userInfo.name || ''}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={userInfo.email || ''}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    />
                </Form.Group>
                {/* Add more fields as needed */}
                <Button variant="primary" type="submit">
                    Update Information
                </Button>
            </Form>

            <h2>Your Ads</h2>
            {ads.map(ad => (
                <Card key={ad.id} className="my-3">
                    <Card.Body>
                        <Card.Title>{ad.title}</Card.Title>
                        <Card.Text>
                            {ad.description}
                        </Card.Text>
                        <Button variant="danger" onClick={() => handleDeleteAd(ad.id)}>Delete</Button>
                        {/* Add an update button or modal to handle ad updates */}
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default ProfilePage;
