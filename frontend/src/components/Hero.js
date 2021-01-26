import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import useContentful from '../hooks/use-contentful'
import dotenv from 'dotenv'
dotenv.config();

const query = `
query {
  homepage(id:"73NL47ptmTKaQl8VNnElhO") {
    hero {
      url
    }
  }
}
`

const Hero = () => {

  let { data, errors } = useContentful(query)

  if (errors) return <span style={{ color: "red", fontWeight: "bold" }}>{errors.map(error => error.message).join(',')}</span>

  if (!data) return <span>Loading..</span>

  const { homepage } = data;
  console.log("data check", homepage.hero.url)

  return (

    <span>
      <Container>
        <Row>
          <Col className='hero-container text-center'>
            <img className="hero-image"
              src={homepage.hero.url}
              alt={homepage.hero.title}
            />
          </Col>
        </Row>
      </Container>
    </span>
  )
}

export default Hero