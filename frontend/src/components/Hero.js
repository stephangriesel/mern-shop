import React from 'react'
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
    assetCollection {
      items {
        sys {
          id
        }
      }
    }
  }
`

const Hero = () => {
  window.fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE}/access_token=${process.env.CONTENTFUL_TOKEN}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }).then(response => response.json())
    .then(json => console.log(json.data))
  return (

    <>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Hero Image
                    </Col>
        </Row>
      </Container>
    </>
  )
}

export default Hero