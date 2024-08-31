import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(""); // Added error state

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const { data } = await axios.get('http://127.0.0.1:8000/api/ads/view/');
                setRooms(data);
            } catch (error) {
                console.error("Failed to fetch rooms:", error);
                setError("Failed to load rooms. Please try again later."); // Set error message
            }
        };

        fetchRooms();
    }, []);

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">All Rooms</h1>
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error if any */}
            <div className="row">
                {rooms.map(room => (
                    <div className="col-md-4 mb-4" key={room.id}>
                        <div className="card h-100">
                            {room.images && room.images.length > 0 && (
                                <img 
                                    src={`http://127.0.0.1:8000${room.images[0].image}`} 
                                    className="card-img-top" 
                                    alt={room.title} 
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{room.title}</h5>
                                <p className="card-text">Price: ${room.price}</p>
                                <p className="card-text">City: {room.city}</p>
                                <Link to={`/rooms/${room.id}`} className="btn btn-primary">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllRooms;
