import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from '../components/Slider';
import FilterBy from '../components/FilterBy';
import RoomDetailsModal from '../components/RoomDetailsModal';

const HomeScreen = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const { data } = await axios.get('http://127.0.0.1:8000/api/ads/view/');
                setRooms(data);
            } catch (error) {
                console.error("Failed to fetch rooms:", error.response ? error.response.data : error.message);
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
        <div>
            <Slider />
            <div className="separator p-4">
                <div className="line"></div>
                <h4 className="mb-0 fw-bold separator-title"><b>Featured Rooms</b></h4>
                <div className="line"></div>
            </div>

            <div className="page-wrapper">
                <section className="py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-xl-12">
                                <div className="product-wrapper">
                                    <FilterBy />

                                    <div className="product-grid">
                                        <div className="row row-cols-2 row-cols-md-4 g-3 g-sm-4">
                                            {rooms.map(room => (
                                                <div className="col" key={room.id}>
                                                    <div className="card" onClick={() => handleShowModal(room)} style={{ cursor: 'pointer' }}>
                                                        <div className="position-relative overflow-hidden">
                                                            {room.images.length > 0 && (
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
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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

export default HomeScreen;
