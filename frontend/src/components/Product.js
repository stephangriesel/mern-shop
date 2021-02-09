import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import '../index.css'

const Product = ({ product }) => {
    console.log("product card data test...", product)
    return (
        <Card className="my-1 p-1 product-card">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
                </Link>
            </Card.Body>

            <Card.Text as="p">
                {product.shortdesc}
            </Card.Text>

            <Card.Text as="h3">
                €{product.price}
            </Card.Text>
        </Card>
    )
}

export default Product
