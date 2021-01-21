import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'

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
  let [data, setData] = useState(null)

  useEffect(() => {
    const loadContentful = async () => {
      const { data: contentfulToken } = await axios.get('/api/config/contentfultoken')
      const { data: contentfulSpace } = await axios.get('/api/config/contentfulspace')
      console.log('Contentful token test: ', contentfulToken);
      console.log('Contentful space test: ', contentfulSpace);
      window.fetch(`https://graphql.contentful.com/content/v1/spaces/${contentfulSpace}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${contentfulToken}`
        },
        body: JSON.stringify({ query }),
      }).then((response) => response.json())
        .then(json => setData(json.data))
    }
    loadContentful()
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