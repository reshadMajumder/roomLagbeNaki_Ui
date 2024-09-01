import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Spinner, Alert, Card } from 'react-bootstrap';
// import './UserAdsPage.css'; // Assuming you want to add custom styles

const UserAdsPage = () => {
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem('access');
        if (!token) {
          console.error('No token found');
          return;
        }

        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/ads/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching ads:', error.response || error.message);
        setError('Error fetching ads');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const handleViewAd = (ad) => {
    setSelectedAd(ad);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.put(`http://127.0.0.1:8000/api/user/ads/${selectedAd.id}/`, selectedAd, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAds(ads.map(ad => (ad.id === selectedAd.id ? response.data : ad)));
      setShowModal(false);
    } catch (error) {
      console.error('Error updating ad:', error);
      setError('Error updating ad');
    }
  };

  const handleDelete = async (adId) => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    try {
      const token = localStorage.getItem('access');
      await axios.delete(`http://127.0.0.1:8000/api/user/ads/${adId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAds(ads.filter(ad => ad.id !== adId));
    } catch (error) {
      console.error('Error deleting ad:', error);
      setError('Error deleting ad');
    } finally {
      setDeleteConfirm(false);
    }
  };

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-4">
      <h2>Your Ads</h2>
      {ads.length === 0 ? (
        <p>No ads to display.</p>
      ) : (
        <div className="product-grid">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {ads.map(ad => (
              <div className="col" key={ad.id}>
                <Card className="h-100 shadow-sm">
                  <div className="position-relative">
                    {ad.images.length > 0 && (
                      <Card.Img
                        variant="top"
                        src={`http://127.0.0.1:8000${ad.images[0].image}`}
                        alt={ad.title}
                        className="img-fluid zoom-in"
                      />
                    )}
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="mb-2 text-center">{ad.title}</Card.Title>
                    <Card.Text className="text-center text-muted">{ad.city}</Card.Text>
                    <Card.Text className="text-center h6 text-danger">${ad.price}</Card.Text>
                    <div className="mt-auto d-flex justify-content-center">
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleViewAd(ad)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant={deleteConfirm ? 'danger' : 'outline-danger'}
                        size="sm"
                        onClick={() => handleDelete(ad.id)}
                      >
                        {deleteConfirm ? 'Confirm Delete' : 'Delete'}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Ad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAd && (
            <Form>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedAd.title}
                  onChange={(e) => setSelectedAd({ ...selectedAd, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedAd.description}
                  onChange={(e) => setSelectedAd({ ...selectedAd, description: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedAd.price}
                  onChange={(e) => setSelectedAd({ ...selectedAd, price: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedAd.city}
                  onChange={(e) => setSelectedAd({ ...selectedAd, city: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserAdsPage;
