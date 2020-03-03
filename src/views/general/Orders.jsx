import React, { useState } from 'react';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import Login from '../../components/ClientLogin';

const GET_ORDERS = gql`
	query{
		orders {
			createdAt,
			id,
			deliveryNote,
			status,
			orderer{
				name,
				id
			},
			products{
				name,
				description,
				status
			}
		}
	}
`;

const Orders = () => {
	const { loading, error, data } = useQuery(GET_ORDERS, {
		pollInterval: 500,
	});

	if (loading) {
		return (
			<div className="loading">
				Fetching
			</div>
		)
	}
	if (error) {
		console.log('error' ,error)
		return (
			<div className="loading">
				OOOPS an error has occurred
			</div>
		)
	}

	return (
		<div>
			<Login />
			<div className="orders">
				<div className="container">
					<div className="col s12">
						<h3 className="left">List Orders</h3>
					</div>
					<table>
						<thead>
							<tr>
								<th>Order data</th>
								<th>Status</th>
								<th>Delivery Note</th>
								<th>Products</th>
							</tr>
						</thead>

						<tbody>
							{data.orders.map(order => {
								return (
									<tr key={order.id}>
										<td>{order.createdAt}</td>
										<td>{order.status}</td>
										<td>{order.deliveryNote}</td>
										<td>
											{order.products.map(p => {
												return (<span> {p.name} {" "} </span>)
											})}
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		data: state.data
	}
};

export default connect(mapStateToProps)(Orders);