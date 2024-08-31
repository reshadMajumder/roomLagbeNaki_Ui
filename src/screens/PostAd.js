import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const PostAd = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    division: "",
    city: "",
    address: "",
    description: "",
    room_type: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input field changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files)); // Convert file list to an array
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form data
    if (!formData.title || !formData.price || !formData.city || !formData.room_type) {
      setError("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("access");
    if (!token) {
      setError("You need to be logged in to post an ad.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const form = new FormData();
    images.forEach((image, index) => {
      form.append('images', image);  // Note: the key here should be 'images'
    });
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
    

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/post-ad/",
        form,
        config
      );
      setSuccess("Ad posted successfully!");
      setFormData({
        title: "",
        price: "",
        division: "",
        city: "",
        address: "",
        description: "",
        room_type: "",
      });
      setImages([]);
    } catch (error) {
      const errorMsg = error.response?.data || error.message;
      setError(`Failed to post ad. ${errorMsg}`);
      console.error(errorMsg);
    }
  };

  return (
    <section>
      <Container>
        <div className="section-authentication-signin d-flex align-items-center justify-content-center my-5">
          <Row className="row-cols-1 row-cols-xl-2">
            <Col className="mx-auto">
              <Card>
                <Card.Body>
                  <div className="border p-4 rounded">
                    <div className="text-center">
                      <h3>Post Your Ad</h3>
                    </div>
                    <div className="login-separater text-center mb-4">
                      <span>ENTER VALID INFORMATION</span>
                      <hr />
                    </div>
                    <Form className="row g-3" onSubmit={handleSubmit}>
                      <Col xs={12}>
                        <Form.Label>Images</Form.Label>
                        <Form.Control
                          type="file"
                          multiple
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </Col>
                      <Col xs={12}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </Col>
                      <Col xs={12}>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="text"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                        />
                      </Col>
                      <Col xs={12}>
                        <Form.Label>Division</Form.Label>
                        <Form.Control
                          type="text"
                          name="division"
                          value={formData.division}
                          onChange={handleInputChange}
                        />
                      </Col>
                      <Col xs={12}>
                        <Form.Label>City/Area</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </Col>
                      <Col xs={12}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </Col>
                      <Col xs={12}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={4}
                        />
                      </Col>
                      <Col xs={12}>
                        <Form.Label>Room Type</Form.Label>
                        <Form.Control
                          type="text"
                          name="room_type"
                          value={formData.room_type}
                          onChange={handleInputChange}
                          required
                        />
                      </Col>
                      <Col xs={12}>
                        <div className="d-grid">
                          <Button type="submit" className="btn btn-dark">
                            POST
                          </Button>
                        </div>
                      </Col>
                      {error && <div className="alert alert-danger mt-3">{error}</div>}
                      {success && <div className="alert alert-success mt-3">{success}</div>}
                    </Form>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default PostAd;