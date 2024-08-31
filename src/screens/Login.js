import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', { identifier, password });

      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      localStorage.setItem('userName', response.data.user.username); // Ensure this matches


      navigate('/'); // Redirect to dashboard or another page
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="section-authentication-signin d-flex align-items-center justify-content-center my-5">
          <div className="row row-cols-1 row-cols-xl-2">
            <div className="col mx-auto">
              <div className="card">
                <div className="card-body">
                  <div className="border p-4 rounded">
                    <div className="text-center">
                      <h3>Sign In</h3>
                      <p>
                        Don't have an account yet? <a href="/register">Sign up here</a>
                      </p>
                    </div>
                    <div className="login-separater text-center mb-4">
                      <span>SIGN IN WITH EMAIL OR PHONE</span>
                      <hr />
                    </div>
                    <div className="form-body">
                      <form className="row g-3" onSubmit={handleLogin}>
                        <div className="col-12">
                          <label htmlFor="inputIdentifier" className="form-label">Email or Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputIdentifier"
                            placeholder="Email or Phone Number"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="inputChoosePassword" className="form-label">Enter Password</label>
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
                        <div className="col-md-6">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckChecked"
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Remember Me</label>
                          </div>
                        </div>
                        <div className="col-md-6 text-end">
                          <a href="/forgot-password">Forgot Password?</a>
                        </div>
                        <div className="col-12">
                          <div className="d-grid">
                            <button type="submit" className="btn btn-dark">
                              <i className="bx bxs-lock-open"></i> Sign In
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

export default Login;
