
import React, { useEffect } from 'react'
import { Row, Col, Container} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import LoginComponent from './LoginComponent'
import CreateComponent from './CreateComponent'
import airplane from '../../static/images/airplane.png'
import order_rider from '../../static/images/order_ride.png'

function ProviderComponent({ setToken }){
    const token = localStorage.getItem('token')

    useEffect(() => {
        document.title = 'Mozio'
    }, [])

    return (
        <React.Fragment>
            <Container>
                {token !== null ? <Redirect to='service-area/' />
                : <div>
                    <Row>
                        <Col>
                            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="1000" height="1000" src={airplane} alt=""></img> 
                        </Col>
                        <Col>
                            <LoginComponent setToken={setToken} />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <CreateComponent />
                        </Col>
                        <Col>
                            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="1000" height="1000" src={order_rider} alt=""></img>
                        </Col>
                    </Row>
                </div>
                }
            </Container>
        </React.Fragment>
    )
}

export default ProviderComponent