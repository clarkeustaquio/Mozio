import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Form, Button, Alert } from 'react-bootstrap'

import axios from 'axios'
import { login_provider } from '../../static/api_endpoints'
import { CircularProgress } from '@material-ui/core'

function LoginComponent({ setToken }){
    const history = useHistory()
    const [validated, setValidated] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')
    const [isAlertShow, setIsAlertShow] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)

    const handleLogin = (event) => {
        setIsSubmit(true)
        const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                setIsSubmit(false)
            }else{
                event.preventDefault();
                event.stopPropagation();

                axios.post(login_provider, {
                    username: email,
                    password: password,
                }).then(response => {
                    if(response.status === 200){
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('first_name', response.data.first_name)
                        localStorage.setItem('last_name', response.data.last_name)
                        localStorage.setItem('is_admin', response.data.is_admin)
                        setIsSubmit(false)
                        setToken(response.data.token)
                        history.push('/service-area')
                    }
                }).catch(error => {
                    setAlert(error.response.data.non_field_errors[0])
                    setIsAlertShow(true)
                    setIsSubmit(false)
                })
            }
        setValidated(true);
    }

    return (
        <React.Fragment>
            <Container className="mt-4">
            
            <h3 className="featurette-heading font-weight-bold"><span style={{ color: '#4D74C2' }}>Welcome to </span><span style={{ color: '#E16D7A' }}>Mozio.</span></h3>
            <span className="lead text-muted">Login to Continue.</span>

            {isAlertShow === true ?  <Alert className="mt-3" variant="danger" onClose={() => setIsAlertShow(false)} dismissible>{alert}</Alert> : null}
            <Form className="mt-3" noValidate validated={validated} onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="email" 
                        placeholder="Enter Email" 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
           
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </Form.Group>
                <Button style={{
                            background: '#4D74C2',
                            borderColor: '#4D74C2'
                        }} className="col-12" size="lg" variant="primary" type="submit">
                        {isSubmit === true ? <CircularProgress size={25} /> : "Login" }
                </Button>
            </Form>
            </Container>
        </React.Fragment>
    )
}

export default LoginComponent