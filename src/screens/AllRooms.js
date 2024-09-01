import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomDetailsModal from '../components/RoomDetailsModal'; // Adjust the import path as needed
import B_URL from '../Services/Api';

const AllRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const { data } = await axios.get(`${B_URL}/api/ads/view/`);
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
                        <div className="card" onClick={() => handleShowModal(room)} style={{ cursor: 'pointer', height: '90%' }}>
                            <div className="position-relative overflow-hidden">
                                {room.images.length > 0 && (
                                    <img
                                        src={`${B_URL}${room.images[0].image}`}
                                        className="img-fluid zoom-in"
                                        alt={room.title}
                                        style={{ height: '100%', objectFit: 'cover' }}
                                    />
                                )}
                            </div>
                            <div className="card-body ">
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="">
                                        <h6 className="mb-0 fw-bold product-short-title">
                                            {room.title}
                                        </h6>
                                    </div>
                                </div>
                                <div className="product-price d-flex align-items-center justify-content-center gap-2 mt-2">
                                    <div className="h6 fw-bold text-danger">
                                        {room.price} Tk
                                    </div>
                                </div>
                                <p className="text-center mt-0">{room.city}</p>
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
