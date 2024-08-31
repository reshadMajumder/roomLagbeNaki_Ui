import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from '../components/Slider';
import FilterBy from '../components/FilterBy';

const HomeScreen = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const { data } = await axios.get('http://127.0.0.1:8000/api/ads/view/'); // Adjust the API endpoint as needed
                setRooms(data);
            } catch (error) {
                console.error("Failed to fetch rooms:", error.response ? error.response.data : error.message);
            }
        };

        fetchRooms();
    }, []);

    return (
        <div>
            <Slider />
            {/* Separator */}
            <div className="separator p-4">
                <div className="line"></div>
                <h4 className="mb-0 fw-bold separator-title"><b>Featured Rooms</b></h4>
                <div className="line"></div>
            </div>

            {/* Start page wrapper */}
            <div className="page-wrapper">
                <section className="py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-xl-12">
                                <div className="product-wrapper">
                                    <FilterBy />

                                    {/* Product Grid */}
                                    <div className="product-grid">
                                        <div className="row row-cols-2 row-cols-md-4 g-3 g-sm-4">
                                            {rooms.map(room => (
                                                <div className="col" key={room.id}>
                                                    <div className="card">
                                                        <div className="position-relative overflow-hidden">
                                                            {room.images.length > 0 && (
                                                                <a href={`/rooms/${room.id}`}>
                                                                    <img
                                                                        src={`http://127.0.0.1:8000${room.images[0].image}`}
                                                                        className="img-fluid zoom-in"
                                                                        alt={room.title}
                                                                    />
                                                                </a>
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
        </div>




    );
};

export default HomeScreen;
