// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        username: fullName,
        email,
        phone,
        password
      });

      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);

      navigate('/login'); // Redirect to dashboard or another page
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="section-authentication-signin d-flex align-items-center justify-content-center my-5">
          <div className="row row-cols-1 row-cols-lg-1 row-cols-xl-2">
            <div className="col mx-auto">
              <div className="card mb-0">
                <div className="card-body">
                  <div className="border p-4 rounded">
                    <div className="text-center">
                      <h3>Sign Up</h3>
                      <p>
                        Already have an account? <a href="/login">Sign in here</a>
                      </p>
                    </div>
                    <div className="login-separater text-center mb-4">
                      <span>OR SIGN UP WITH EMAIL</span>
                      <hr />
                    </div>
                    <div className="form-body">
                      <form className="row g-3" onSubmit={handleRegister}>
                        <div className="col-12">
                          <label htmlFor="inputName" className="form-label">Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="inputEmailAddress" className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="inputEmailAddress"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="inputPhone" className="form-label">Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputPhone"
                            placeholder="016XXX-XXXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="inputChoosePassword" className="form-label">Password</label>
                          <div className="input-group" id="show_hide_password">
                            <input
                              type="password"
                              className="form-control border-end-0"
                              id="inputChoosePassword"
                              placeholder="Enter Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <span className="input-group-text bg-transparent">
                              <i className='bx bx-hide'></i>
                            </span>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckChecked"
                              required
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">I read and agree to Terms & Conditions</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-grid">
                            <button type="submit" className="btn btn-dark">
                              <i className='bx bx-user'></i> Sign Up
                            </button>
                          </div>
                        </div>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
      </div>
    </section>
  );
};

export default Register;
