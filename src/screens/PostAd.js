import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import B_URL from "../Services/Api";

const citiesByDivision = {
  Dhaka: ['Adabor', 'Aftabnagar', 'Ahmed Bagh', 'Airport', 'Airport Road', 'Amtoli', 'Aowlad Hossain Lane', 'Arambagh', 'Arjot Para', 'Armanitola', 'Asadgate', 'Ashulia', 'Aurangajeb road', 'Avoy Das Lane', 'Azampur', 'Azimpur', 'Babar Road', 'Baburial', 'Badamtoli', 'Badda', 'Baily Road', 'Bakshibazar', 'Kallyanpur', 'Bakura Balughat', 'Banagram', 'Banani', 'Banasree', 'Banga Bandhu Stadium', 'Banga Bhaban', 'Bangla Bazar', 'Bangla Motor', 'Bangshal', 'Baridhara', 'Bashabo', 'Bashantak', 'Bashbari', 'Bashir Uddin Road', 'Bashundhara', 'Baten Nagar', 'Begunbari', 'Bhashantek', 'Bijoy Nagar', 'Bongo Islamia Market', 'Bonogram', 'Bonosree', 'Buet', 'Cantonment', 'Koilash Ghosh Lane', 'Captain Bazar', 'Cawak Bazar', 'Central Road', 'Chamelibag', 'Chankarpul Lane', 'Charkaliganj', 'Circuit House Road', 'Circular Road', 'Court House Street', 'Crescent Road', 'Dania', 'Darussalam', 'Demra', 'Dewan Mension Road', 'Dhaka Cant', 'Dhaka Medical Coll', 'Dhaka University', 'Dhakhinkhan', 'Dhakhkhin Khan', 'Dhalpur', 'Dhamrai', 'Dhanmondi', 'Dholaikhal', 'Dholaipar', 'Dilkusha', 'Dilu Road', 'Dit Road Dohar', 'Dohs Baridhara', 'Dohs Mohakhali East Maniknagar', 'Elephant Road', 'Eskaton Road', 'Farashgonj', 'Faridabad', 'Farmgate', 'Fokirapul', 'Free School Street', 'Fullar Road', 'Gabtoli', 'Gajipur', 'Gandaria', 'Girda Urddu Road', 'Golapbag', 'Gopibag', 'Goran', 'Green Road', 'Gulbag', 'Gulistan', 'Gulshan', 'Gulshan-1', 'Gulshan-2', 'Haji Para', 'Hatirpool', 'Hatkhola Road', 'Hazaribagh', 'Ibrahim Pur', 'Imamganj', 'Indira Road', 'Indrani Road', 'Iqbal Road', 'Islam Mension Road', 'Jagannathpur', 'Jahangirnagar University', 'Jakir Hossain Road', 'Jamalpur', 'Janson Road', 'Japan Garden City', 'Jasimuddin Road', 'Jatrabari', 'Jigatola', 'Joar Sahara', 'Jumrail Lane', 'Jurian', 'K.b.rudra Road', 'K.m Das Lane', 'Kadamtoli', 'Kafrul', 'Kailash Ghosh Lane', 'Kakoli', 'Kakrail', 'Kalabagan', 'Kalachandpur', 'Kali Bari Road', 'Kaltabazar', 'Kamal Ataturk Avenue', 'Kamalapur', 'Kamringir Char', 'Katabon', 'Kathal Baghan', 'Kawlar', 'Kawran Bazar', 'Kayettuly', 'Kazi Abdul Hamid Road', 'Kazi Alauddin Road', 'Kazi Nazrul Islam', 'Kazi Nazrul Islam Avenue', 'Kazi Para', 'Kb Rudra Road', 'Keraniganj', 'Khazi Dewan', 'Khilgaon', 'Khilkhet', 'Koltabazar', 'Kolutola', 'Kotowali', 'Kuril', 'Kurmitola Lake Circus', 'Lal Mohonshaha', 'Lalbagh Lalmatia', 'Lutfar Rahman Lane', 'Luxmibazar', 'Madartek', 'Mahuttully', 'Malibagh', 'Malitola', 'Manda', 'Manik Mia Avenue', 'Manik Nagar', 'Manikdi', 'Maradia', 'Matuail', 'Mazid Sardar Road', 'Menadia', 'Minto Road', 'Mirbagh', 'Mirpur', 'Mirpur Cantonment', 'Mirpur Dohs', 'Mirpur Road', 'Mirpur-1', 'Mirpur-11', 'Mirpur-10', 'Mirpur-12', 'Mirpur-13', 'Mirpur-14', 'Mirpur-2', 'Mirpur-6', 'Mirpur-7', 'Mitford Road', 'Mogbazar', 'Mogoltooly', 'Mohakhali', 'Mohammadpur', 'Mohamodia Housing Ltd', 'Mohanogor R/a', 'Mollartek', 'Momin Bagh', 'Moneshawar Road', 'Monipur', 'Motijheel', 'Mugda', 'Nawabganj', 'New Cirqular Road', 'New Market New Paltan', 'Niketan', 'Nikunja', 'Nikunja-2', 'Nilkhet', 'Nimtoli', 'Nishat Nagar', 'Nobab Road Nobinbagh', 'North Brook Hall Road', 'North Circular Road', 'Noya Palton', 'Old Airport Road', 'Old Dhaka', 'Osman Gani Road', 'Outer Circular Road', 'P C Culture Housing', 'Paikpara Pallabi', 'Paltan', 'Panthopath', 'Paribagh', 'Park Road', 'Pathlighata', 'Patla Khan Lane', 'Phokirapool', 'Pilkhana', 'Pirerbag', 'Polashi', 'Postogola', 'Progoti Sharani', 'Purana Paltan', 'R.K Mission Road', 'Radkhola', 'Rishab Bazar', 'Rajarbagh', 'Rayer Bazar', 'Ramakanta Nandi Lane', 'Ramna', 'Rampura', 'Rankin Street', 'Razar Dewry', 'Rajabazar', 'Roma Kantondi Len', 'Rupnagar', 'Sabujbagh', 'Sadarghat Road', 'Saidpur', 'Santibag Chotopool', 'Santibagh', 'Santinagar', 'Satmosjid Road', 'Satroja', 'Savar', 'Sayedabad', 'Segunbagicha', 'Shah Ali', 'Shahajadpur', 'Shahbag', 'Shaheen Bagh', 'Shahid Bagh', 'Shahjahanpur', 'Shamibag', 'Shamoly', 'Shankar', 'Shantibagh', 'Shantinagar', 'Sherebanglanagar', 'Shewra Para', 'Shiddheswri', 'Shobhanbag', 'Shohidbug', 'Shomshar Nogor', 'Shonir Akra', 'Shyampur', 'Shypahibag', 'Siddeswari', 'Siddique Bazar', 'Simsom Road', 'Singtola', 'Sir Iqbal Road', 'Sobhanbagh', 'Sonargaon Road', 'Sorafat Gonj Lane', 'South Begunbari', 'South Block Street', 'Strand Road', 'Sukrabad', 'Sutrapur', 'Swamibag', 'Taherbagh Lane', 'Tajuddin Soroni', 'Tallabag', 'Tatibazar', 'Tejgaon', 'Tejkunipara', 'Tejturi Bazar', 'Wasa Road', 'West Dolairpar', 'West Kazipara', 'Thatari Bazar', 'Tikatuly', 'Tipu Sultan Road', 'Topkhana Road', 'Toyenbi Circular Road', 'Turag', 'Uttara West', 'Uttarkhan', 'Vatara Wari', 'Zasim Bazar', 'Uttara', 'West Meradia', 'West Panthopath', 'Zafrabad', 'Zigatola', 'Zindabahar'],
  // Add other divisions with their respective cities
  // Example:
  // Chittagong: ['Agrabad', 'Chawkbazar', 'Halishahar', ...],
  // Sylhet: ['Bandar Bazar', 'Ambarkhana', 'Shibganj', ...],
};

const PostAd = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    division: "",
    city: "",
    address: "",
    phone:"",
    description: "",
    room_type: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.title || !formData.price || !formData.city || !formData.room_type || !formData.phone) {
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
    images.forEach((image) => {
      form.append('images', image);
    });
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      await axios.post(`${B_URL}/api/post-ad/`, form, config);
      setSuccess("Ad posted successfully!");
      setFormData({
        title: "",
        price: "",
        division: "",
        city: "",
        address: "",
        phone:"",
        description: "",
        room_type: "",
      });
      setImages([]);
      setTimeout(() => setSuccess(""), 3000); // Reset success message after 3 seconds
    } catch (error) {
      const errorMsg = error.response?.data || error.message;
      setError(`Failed to post ad. ${errorMsg}`);
    }
  };

  const handleDivisionChange = (e) => {
    const selectedDivision = e.target.value;
    setFormData({ ...formData, division: selectedDivision, city: "" });
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
                        {images.length > 0 && (
                          <div className="image-preview mt-3">
                            {images.map((image, index) => (
                              <img
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                style={{ width: "100px", marginRight: "10px" }}
                              />
                            ))}
                          </div>
                        )}
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
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </Col>
                      <Row>
                        <Col xs={6}>
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                          />
                        </Col>
                        <Col xs={6}>
                          <Form.Label>Room Type</Form.Label>
                          <Form.Control
                            type="text"
                            name="room_type"
                            value={formData.room_type}
                            onChange={handleInputChange}
                            required
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          <Form.Label>Division</Form.Label>
                          <Form.Control
                            as="select"
                            name="division"
                            value={formData.division}
                            onChange={handleDivisionChange}
                          >
                            <option value="">Select Division</option>
                            {Object.keys(citiesByDivision).map((division) => (
                              <option key={division} value={division}>
                                {division}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Label>City/Area</Form.Label>
                          <Form.Control
                            as="select"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            disabled={!formData.division}
                          >
                            <option value="">Select City/Area</option>
                            {formData.division && citiesByDivision[formData.division].map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
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
