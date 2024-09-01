import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomDetailsModal from '../components/RoomDetailsModal'; // Adjust the import path as needed

const AllRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const { data } = await axios.get('http://127.0.0.1:8000/api/ads/view/');
                setRooms(data);
            } catch (error) {
                console.error("Failed to fetch rooms:", error);
                setError("Failed to load rooms. Please try again later.");
            }
        };

        fetchRooms();
    }, []);

    const handleShowModal = (room) => {
        setSelectedRoom(room);
    };

    const handleCloseModal = () => {
        setSelectedRoom(null);
    };

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">All Rooms</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row row-cols-2 row-cols-md-4 g-3 g-sm-4">
                {rooms.map(room => (
                    <div className="col" key={room.id}>
                        <div className="card h-100" onClick={() => handleShowModal(room)} style={{ cursor: 'pointer' }}>
                            <div className="position-relative overflow-hidden">
                                {room.images && room.images.length > 0 && (
                                    <img 
                                        src={`http://127.0.0.1:8000${room.images[0].image}`} 
                                        className="img-fluid zoom-in" 
                                        alt={room.title} 
                                    />
                                )}
                            </div>
                            <div className="card-body px-0">
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="">
                                        <h6 className="mb-0 fw-bold product-short-title">
                                            {room.title}
                                        </h6>
                                    </div>
                                </div>
                                <div className="product-price d-flex align-items-center justify-content-center gap-2 mt-2">
                                    <div className="h6 fw-bold text-danger">
                                        ${room.price}
                                    </div>
                                </div>
                                <p className="text-center mt-2">{room.city}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for room details */}
            <RoomDetailsModal 
                room={selectedRoom} 
                show={!!selectedRoom} 
                handleClose={handleCloseModal} 
            />
        </div>
    );
};

export default AllRooms;
