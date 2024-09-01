import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/HomeScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AllRoomsScreen from './screens/AllRooms';
import PostAd from './screens/PostAd';
import Login from './screens/Login';
import Register from './screens/Register';
import ProfilePage from './components/ProfilePage';
import UserAdsPage from './components/UseAds';
import UserProfilePage from './components/UserProfile';


// Import other components as needed

function App() {
  return (
    <Router>
      <div className="wrapper">
        {/* Navbar */}
        <Navbar />

        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/all-ads" element={<AllRoomsScreen />} />
          <Route path="/post" element={<PostAd />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/user-ads" element={<UserAdsPage/>} />
          <Route path="/profile" element={<UserProfilePage/>} />


        </Routes>
        <Footer />

        {/* Back To Top Button */}
        <a href="#" className="back-to-top">
          <i className="bx bxs-up-arrow-alt"></i>
        </a>
      </div>
    </Router>
  );
}

export default App;