import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import B_URL from '../Services/Api';

const UserAdsPage = () => {
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem('access');
        if (!token) {
          console.error('No token found');
          return;
        }

        const userId = localStorage.getItem('userId');
        const response = await axios.get(`${B_URL}/api/user/${userId}/ads/`, {
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

  const handleShowModal = (ad) => {
    setSelectedAd(ad);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAd(null);
    setShowModal(false);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.put(`${B_URL}/api/user/ads/${selectedAd.id}/`, selectedAd, {
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
    try {
      const token = localStorage.getItem('access');
      await axios.delete(`${B_URL}/api/user/ads/${adId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAds(ads.filter(ad => ad.id !== adId));
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting ad:', error);
      setError('Error deleting ad');
    }
  };

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Your Ads</h1>
      {ads.length === 0 ? (
        <p>No ads to display.</p>
      ) : (
        <div className="row row-cols-2 row-cols-md-4 g-3 g-sm-4">
          {ads.map(ad => (
            <div className="col" key={ad.id}>
              <div className="card h-100">
                <div className="position-relative overflow-hidden" onClick={() => handleShowModal(ad)} style={{ cursor: 'pointer' }}>
                  {ad.images && ad.images.length > 0 && (
                    <img 
                      src={`${B_URL}${ad.images[0].image}`} 
                      className="img-fluid zoom-in" 
                      alt={ad.title} 
                    />
                  )}
                </div>
                <div className="card-body px-0">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="">
                      <h6 className="mb-0 fw-bold product-short-title">
                        {ad.title}
                      </h6>
                    </div>
                  </div>
                  <div className="product-price d-flex align-items-center justify-content-center gap-2 mt-2">
                    <div className="h6 fw-bold text-danger">
                      {ad.price} Tk
                    </div>
                  </div>
                  <p className="text-center mt-2">{ad.city}</p>
                  <div className="d-flex justify-content-around mt-3">
                    <Button variant="primary" size="sm" onClick={() => handleShowModal(ad)}>Update</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(ad.id)}>Delete</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="danger" onClick={() => handleDelete(selectedAd.id)}>
            Delete Ad
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserAdsPage;
