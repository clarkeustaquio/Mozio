import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import axios from 'axios'
import { logout_provider } from '../static/api_endpoints'

function NavComponent({ setToken, token }){
    const history = useHistory()
    const name = localStorage.getItem('last_name') + ', ' + localStorage.getItem('first_name')

    const handleLogout = () => {
        axios.post(logout_provider, {}, {
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then(response => {
            if(response.status === 200){
                setToken('')
                localStorage.clear()
                history.push('/')
            }
        }).catch(() => {
            throw new Error('Server Refused. Try again later.')
        })
    }

    return (
        <React.Fragment>
            <Navbar bg="light" expand="lg" style={{
                height: '7vh'
            }}>
                <Container>
                    <Link to='/' style={{ textDecoration: 'none'}}>
                        <Navbar.Brand><span className="h2"><span style={{ color: '#4D74C2' }}>Moz</span><span style={{ color: '#E16D7A' }}>io.</span></span></Navbar.Brand>
                    </Link>
                    <Navbar.Toggle />
           
                    {token.length > 0 ? <div>
                        <Navbar.Collapse>
                            <Nav>
                                <Nav.Link as={Link} to='/providers'>Providers</Nav.Link>
                            </Nav>
                            <Nav className="ms-auto">
                                <NavDropdown title={name}>
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                    : null
                    }
                </Container>
            </Navbar>            
        </React.Fragment>
    )
}

export default NavComponent