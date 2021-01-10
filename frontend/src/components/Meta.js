import React from 'react'
import { Helmet } from 'react-helmet'


const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="description" content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome to Mern Shop',
    description: 'One stop shop',
    keywords: 'electronics, cellphone, playstation'
}

export default Meta
