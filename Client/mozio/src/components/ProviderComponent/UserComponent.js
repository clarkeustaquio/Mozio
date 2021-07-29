import React, { useEffect, useState } from 'react'
import { Table, Container, Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios'
import { get_providers, update_provider, delete_provider } from '../../static/api_endpoints'

function UserComponent(){
    const token = localStorage.getItem('token')
    const [provider, setProvider] = useState([])
    const [isShow, setIsShow] = useState(false)

    const [validated, setValidated] = useState(false)
    const [userID, setUserID] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [language, setLanguage] = useState('')
    const [currency, setCurrency] = useState('')

    useEffect(() => {
        document.title = 'Provider'
    }, [])

    useEffect(() => {
        axios.get(get_providers, {
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then(response => {
            if(response.status === 200){
                setProvider(response.data)
            }
        }).catch(() => {
            throw new Error('Server Refused. Try again later.')
        })
    }, [])

    const handleShow = (user_id, last_name, first_name, username, phone_number, language, currency) => {
        setUserID(user_id)
        setLastName(last_name)
        setFirstName(first_name)
        setUsername(username)
        setPhone(phone_number)
        setLanguage(language)
        setCurrency(currency)
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

            axios.put(update_provider, {
                id: userID,
                last_name: lastName,
                first_name: firstName,
                username: username,
                phone_number: phone,
                language: language,
                currency: currency
            }, {
                headers: {
                    'Authorization': 'Token ' + token
                }
            }).then(response => {
                if(response.status === 200){
                    setIsShow(false)
                    setValidated(false)
                }
            }).catch(() => {
                throw new Error('Server Refused. Try again later.')
            })

            axios.get(get_providers, {
                headers: {
                    'Authorization': 'Token ' + token
                }
            }).then(response => {
                if(response.status === 200){
                    setProvider(response.data)
                }
            }).catch(() => {
                throw new Error('Server Refused. Try again later.')
            })
        }
    }

    const handleDelete = () => {
        axios.delete(delete_provider, {
            headers: {
                'Authorization': 'Token ' + token
            },
            data: {
                id: userID
            }
        }).then(response => {
            if(response.status === 200){
                setProvider(response.data)
                setIsShow(false)
            }
        }).catch(() => {
            throw new Error('Server Refused. Try again later.')
        })
    }

    return (
        <React.Fragment>
            <Container className="mt-3">
                <h5>Providers</h5>
                <hr />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Language</th>
                        <th>Currency</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {provider.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.last_name}, {user.first_name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.phone_number}</td>
                                    <td>{user.language}</td>
                                    <td>{user.currency}</td>
                                    <td>
                                        <div className="d-grid gap-2">
                                            <Button onClick={() => handleShow(
                                                user.id,
                                                user.last_name,
                                                user.first_name,
                                                user.username,
                                                user.phone_number,
                                                user.language,
                                                user.currency
                                            )} style={{
                                                background: '#4D74C2',
                                                borderColor: '#4D74C2'
                                            }}
                                            variant="primary" size="md">
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleShow(
                                                user.id,
                                                user.last_name,
                                                user.first_name,
                                                user.username,
                                                user.phone_number,
                                                user.language,
                                                user.currency
                                            )} style={{
                                                background: '#E16D7A',
                                                borderColor: '#E16D7A'
                                            }}
                                            variant="secondary" size="md">
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>

            <Modal show={isShow} onHide={() => setIsShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Polygon</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleEdit}>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="email" 
                                placeholder="Enter Email" 
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                required
                            />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                placeholder="Enter First Name"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value.toString())}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Last Name" 
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value.toString())}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="number" 
                                placeholder="Enter Phone"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Language"
                                value={language}
                                onChange={(event) => setLanguage(event.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Currency"
                                value={currency}
                                onChange={(event) => setCurrency(event.target.value)}
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

export default UserComponent