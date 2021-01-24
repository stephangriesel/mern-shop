import { useState, useEffect } from 'react'
import axios from 'axios'

const useContentful = (query) => {
    let [data, setData] = useState(null)
    let [errors, setErrors] = useState(null)

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
            })
                .then((response) => response.json())
                .then(({ data, errors }) => {
                    if (errors) setErrors(errors)
                    if (data) setData(data)
                })
                .catch((error) => setErrors([error]))
        }
        loadContentful()
    }, [query])
    return { data, errors }
}

export default useContentful
