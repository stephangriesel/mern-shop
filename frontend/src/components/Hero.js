import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import dotenv from 'dotenv'
dotenv.config();

const query = `
query {
    homepage(id: "4ym1ZsDDrnuyHQyHCbq9G6") {
      hero {
        fileName
      }
    }
  }
`

const Hero = () => {
  let [data, setData] = useState(null)

  useEffect(() => {
    window.fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE}?access_token=${process.env.CONTENTFUL_TOKEN}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    }).then((response) => response.json())
      .then(json => console.log(json.data))
  }, [])

  if (!data) return <span>Loading..</span>


  return (

    <span>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            {/* Get Data */}
          </Col>
        </Row>
      </Container>
    </span>
  )
}

export default Hero