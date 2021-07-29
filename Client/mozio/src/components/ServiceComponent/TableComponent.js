import React, { useState } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap'
import { delete_service_area, update_service_area } from '../../static/api_endpoints'

import axios from 'axios'

function TableComponent({
    service,
    setService
}){
    const token = localStorage.getItem('token')
    const [validated, setValidated] = useState(false)
    const [polygonID, setPolygonID] = useState('')
    const [polygonName, setPolygonName] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [price, setPrice] = useState(0)

    const [isShow, setIsShow] = useState(false)

    const handleShow = (polygon_id, polygon_name, latitude, longitude, price) => {
        setPolygonID(polygon_id)
        setPolygonName(polygon_name)
        setLatitude(latitude)
        setLongitude(longitude)
        setPrice(price)
        setIsShow(true)
    }

    const handleEdit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

            setValidated(true);

        }else {
            event.preventDefault();
            event.stopPropagation();

            axios.put(update_service_area, {
                id: polygonID,
                polygon: polygonName,
                latitude: latitude,
                longitude: longitude,
                price: price
            }, {
                headers: {
                    'Authorization': 'Token ' + token
                }
            }).then(response => {
                if(response.status === 200){
                    setService(response.data)
                    setIsShow(false)
                    setValidated(false)
                }
            }).catch(() => {
                throw new Error('Server Refused. Try again later.')
            })
        }
    }

    const handleDelete = () => {
        axios.delete(delete_service_area, {
            headers: {
                'Authorization': 'Token ' + token
            },
            data: {
                id: polygonID
            }
        }).then(response => {
            if(response.status === 200){
                setService(response.data)
                setIsShow(false)
            }
        }).catch(() => {
            throw new Error('Server Refused. Try again later.')
        })
    }

    return (
        <React.Fragment>
            <h5 className="mt-4">Service Area</h5>
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Provider</th>
                        <th>Polygon Name</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {service.map((polygon, index) => {
                        return (
                            <tr key={index}>
                                <td>{polygon.provider}</td>
                                <td>{polygon.polygon}</td>
                                <td>{polygon.latitude}</td>
                                <td>{polygon.longitude}</td>
                                <td>{polygon.currency} {polygon.price}</td>
                                <td>
                                <div className="d-grid gap-2">
                                    <Button style={{
                                        background: '#4D74C2',
                                        borderColor: '#4D74C2'
                                    }}
                                    onClick={() => handleShow(
                                        polygon.id, 
                                        polygon.polygon, 
                                        polygon.latitude, 
                                        polygon.longitude, 
                                        polygon.price
                                    )} variant="primary" size="md">
                                        Edit
                                    </Button>
                                    <Button style={{
                                        background: '#E16D7A',
                                        borderColor: '#E16D7A'
                                    }}
                                    onClick={() => handleShow(
                                        polygon.id, 
                                        polygon.polygon, 
                                        polygon.latitude, 
                                        polygon.longitude, 
                                        polygon.price
                                    )} variant="secondary" size="md">
                                        Delete
                                    </Button>
                                </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {service.length === 0 ? <div className="text-center"><span className="h6">No available data.</span></div> : null}
            <Modal show={isShow} onHide={() => setIsShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Polygon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleEdit}>
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
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                value={latitude}
                                onChange={(event) => setLatitude(event.target.value)}
                                type="number"
                                placeholder="Enter Latitude" 
                                required
                                />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                value={longitude}
                                onChange={(event) => setLongitude(event.target.value)}
                                type="number"
                                placeholder="Enter Longitude" 
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
                            <Button style={{
                                background: '#4D74C2',
                                borderColor: '#4D74C2'
                            }} variant="secondary" type="submit">
                                Edit
                            </Button>
                            <Button style={{
                                background: '#E16D7A',
                                borderColor: '#E16D7A'
                            }} variant="primary" onClick={() => handleDelete()}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default TableComponent