import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import dotenv from 'dotenv'
dotenv.config();

const query = `
query {
  person(id: "7rO4f5TlocqD2yl5QH8QzO") {
    name
  }
}
`

const { CONTENTFUL_TOKEN, CONTENTFUL_SPACE } = process.env;
console.log(CONTENTFUL_SPACE)
console.log(CONTENTFUL_TOKEN)

const Hero = () => {
  let [data, setData] = useState(null)

  useEffect(() => {
    window.fetch(`https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CONTENTFUL_TOKEN}`
      },
      body: JSON.stringify({ query }),
    }).then((response) => response.json())
      .then(json => setData(json.data))
  }, [])

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