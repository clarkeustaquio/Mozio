import React, { useEffect, useState } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import axios from 'axios'

import MapComponent from './MapComponent'
import TableComponent from './TableComponent'

import { useHistory } from 'react-router-dom'
import { authorize_provider } from '../../static/api_endpoints'

function ServiceComponent(){
    const history = useHistory()
    const token = localStorage.getItem('token')
    const [service, setService] = useState([])

    useEffect(() => {
        console.log('try')
        axios.get(authorize_provider, {
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then(response => {
            if(response.status === 200){
                setService(response.data)
            }else{
                localStorage.clear()
                history.push('/')
            }
        }).catch(() => {
            localStorage.clear()
            history.push('/')
        })
    }, [])

    useEffect(() => {
        document.title = 'Service Area'
    }, [])

    return (
        <React.Fragment>     
            <Container className="mt-3">
                <Card>
                    <Card.Body>
                        <Card.Title>Select Polygons</Card.Title>
                        <MapComponent setService={setService} />
                    </Card.Body>
                </Card>
                <TableComponent service={service} setService={setService} />
            </Container>
        </React.Fragment>
    )
}

export default ServiceComponent