import React, { useEffect, useState } from 'react';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';

const GET_PRODUCTS = gql`
	query{
		products{
			name,
			id,
			description,
			imageUrl,
			status
		}
	}
`

const Landing = () => {
	const { loading, error, data } = useQuery(GET_PRODUCTS);

	console.log(loading, error, data)

	if (loading) {
		return (
			<div className="loading">
				Fetching
			</div>
		)
	}

	if (error) {
		return (
			<div className="loading">
				OOOPS an error has occurred
			</div>
		)
	}

	return (
		<div className="container">
			Show all products {data.products.length}
			<div className="row">
				{data.products.map(product => {
					return (
						<div className="col s12 m3 l3" key={product.id}>
							<div class={`card ${product.status === 'INACTIVE' ? 'inactive' : ''}`}>
								<div class="card-image">
									<img src={product.imageUrl} />
									<span class="card-title">{product.name}</span>
								</div>
								<div class="card-content">
									<p>
										{product.description}
								  	</p>
								</div>
								<div class="card-action">
									<a href="#">This is a link</a>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Landing