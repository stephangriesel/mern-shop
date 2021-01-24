import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import useContentful from '../hooks/use-contentful'
import dotenv from 'dotenv'
dotenv.config();

const query = `
query {
  person(id: "7rO4f5TlocqD2yl5QH8QzO") {
    name
  }
}
`

const Hero = () => {

  let { data, errors } = useContentful(query)

  if (errors) return <span style={{ color: "red", fontWeight: "bold" }}>{errors.map(error => error.message).join(',')}</span>

  if (!data) return <span>Loading..</span>

  return (

    <span>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            {data.person.name}
          </Col>
        </Row>
      </Container>
    </span>
  )
}

export default Hero