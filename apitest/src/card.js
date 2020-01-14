import React from 'react'

const Card = ({data}) => {
    return (
        <div className='card'>
            <h2>Name: {data.name}</h2>
            <p>Bio: {data.bio}</p>
            <p>Date: {data.created_at}</p>
        </div>
    )
}

export default Card 