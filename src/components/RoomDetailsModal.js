import React from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import phoneIcon from './phoneIcon.png';
import B_URL from '../Services/Api';

const RoomDetailsModal = ({ room, show, handleClose }) => {
    if (!room) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{room.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel>
                    {room.images.map((img, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                src={`${B_URL}${img.image}`}
                                alt={`Slide ${index}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
                <h5 className="mt-4">Price: ${room.price}</h5>
                <p><strong>Division   :</strong> {room.division}</p>
                <p><strong>City       :</strong> {room.city}</p>
                <p><strong>Address    :</strong> {room.address}</p>
                <p><strong>Description:</strong> {room.description}</p>
                <p><strong>Room Type  :</strong> {room.room_type}</p>
                <p><strong>Phone      :</strong> {room.phone}
                    <Button variant="link" className="ml-2 mx-2 p-0" onClick={() => window.location.href = `tel:${room.phone}`}>
                        <img src={phoneIcon} alt="Phone Icon" style={{ width: '26px', height: '26px' }} />
                    </Button>
                </p>
                <p><strong>Date       :</strong> {new Date(room.date).toLocaleString()}</p>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RoomDetailsModal;
