import React, { useState } from 'react';
import { connect } from 'react-redux';
import Login from "../../components/AdminLogin";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2';

const GET_ORDERS = gql`
	query{
		orders{
			id,
			createdAt,
			deliveryNote,
			status,
			products{
				id,
				name
			},
			orderer{
				name
			}
		}
	}
`;

const UPDATE_ORDER = gql`
	mutation UpdateOrder(
		$data: OrderUpdateInput!
		$where: OrderWhereUniqueInput!
	) {
		updateOrder(data: $data, where: $where) {
			id
		}
	}
`;

const Orders = (props) => {
	const { validAdmin } = props.data;
	const { loading, error, data } = useQuery(GET_ORDERS, {
		pollInterval: 500,
	});
	const [
		updateOrder,
	] = useMutation(UPDATE_ORDER);

	const changeStatus = (id, status) => {
		updateOrder({
			variables: {
				"data": {
					"status": status,
				},
				"where": {
					"id": id
				}
			}
		});
	}

	if (!validAdmin) {
		return (
			<Login />
		)
	}

	if (loading) {
		return (
			<div className="loading">
				Fetching
			</div>
		)
	}
	if (error) {
		console.log('error', error)
		return (
			<div className="loading">
				OOOPS an error has occurred
			</div>
		)
	}

	return (
		<div>
			<Login />
			<div className="container orders">
				<div className="row">
					<div className="col s12">
						<h3 className="left">List Orders</h3>
					</div>
					<div className="col s12">
						<table>
							<thead>
								<tr>
									<th>Date Ordered</th>
									<th>Status</th>
									<th>Delivery Note</th>
									<th>Products</th>
									<th>Ordered By</th>
									<th>Tools</th>
								</tr>
							</thead>

							<tbody>
								{data.orders.map(order => {
									return (
										<tr>
											<td>{order.createdAt}</td>
											<td>{order.status}</td>
											<td>{order.deliveryNote}</td>
											<td>
												{order.products.map(p => {
													return (<span> {p.name} {" "} </span>)
												})}
											</td>
											<td>{order.orderer.name}</td>
											<td>
												{order.status === "PENDING" ?
													<button className="waves-effect waves-light btn right green" onClick={() => { changeStatus(order.id, "RECEIVED") }}>Enable</button>
													:
													<span>Order Received</span>
												}
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
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