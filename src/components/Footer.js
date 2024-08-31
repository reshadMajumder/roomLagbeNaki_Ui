import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">About Us</h5>
            <p className="mb-0">RoomLagbe is your trusted partner in finding the perfect accommodation for your needs.</p>
          </div>
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Home</a></li>
              <li><a href="#" className="text-light">Listings</a></li>
              <li><a href="#" className="text-light">About</a></li>
              <li><a href="#" className="text-light">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Support</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">FAQ</a></li>
              <li><a href="#" className="text-light">Terms of Service</a></li>
              <li><a href="#" className="text-light">Privacy Policy</a></li>
              <li><a href="#" className="text-light">Help Center</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="text-uppercase mb-4">Connect</h5>
            <div className="d-flex">
              <a href="#" className="text-light me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-light me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-light me-3"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-light"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <hr className="my-4 bg-light" />
        <div className="text-center">
          <p className="mb-0">© 2023 RoomLagbe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
