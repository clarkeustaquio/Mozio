import React, { useState } from 'react'
import { Container, Modal, Button, Form } from 'react-bootstrap'

import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css'

import axios from 'axios'
import { create_service_area } from '../../static/api_endpoints'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

function MapComponent({ setService }){
    const token = localStorage.getItem('token')
    const [validated, setValidated] = useState(false);
    const [isShow, setIsShow] = useState(false)
    const [data, setData] = useState([])
    const [polygonName, setPolygonName] = useState('')
    const [price, setPrice] = useState(0)

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

            setValidated(true);

        }else {
            event.preventDefault();
            event.stopPropagation();

            axios.post(create_service_area, {
                data: data,
                polygon: polygonName,
                price: price
            }, {
                headers: {
                    'Authorization': 'Token ' + token
                }
            }).then(response => {
                setPolygonName('')
                setPrice(0)
                setIsShow(false)
                setValidated(false)
                setService(response.data)
            }).catch(() => {
                throw new Error('Server Refused. Try again later.')
            })
        }
    };

    return (
        <React.Fragment>
            <Container>
                <MapContainer center={[14.67925389520471, 121.058349609375]} zoom={9} scrollWheelZoom={true}>
                    <FeatureGroup>
                        <EditControl
                            onCreated={(e) => {
                                var layer = e.layer;
                                setData(layer.getLatLngs()[0])
                                setIsShow(true)
                            }}
                        edit={{ remove: false }}
                        position="topright" 
                        draw={{
                            rectangle: false,
                            circle: false,
                            circlemarker: false,
                            marker: false,
                            polyline: false
                        }} />
                    </FeatureGroup>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </Container>

            <Modal show={isShow} onHide={() => setIsShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Polygon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Polygon Name</Form.Label>
                            <Form.Control
                                value={polygonName}
                                onChange={(event) => setPolygonName(event.target.value.toString())}
                                type="text"
                                placeholder="Enter Polygon" 
                                required
                              />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                type="number" 
                                placeholder="Enter Price" 
                                min="1"
                                required
                            />
                        </Form.Group>
                        <Modal.Footer>
                               <Button variant="secondary" onClick={() => setIsShow(false)}>
                                Close
                            </Button>
                            <Button type="submit"  variant="primary">
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default MapComponent