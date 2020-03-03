import React, { useState } from 'react';
import { gql } from "apollo-boost";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import Login from '../../components/ClientLogin'

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
`;

const CREATE_ORDER = gql`
 	 mutation CreateOrder($data: OrderCreateInput!){
		createOrder(data: $data){
			id
		}
	}
`;

const Landing = (props) => {
	const { loading, error, data } = useQuery(GET_PRODUCTS, {
		pollInterval: 500,
	});
	const [cart, setCart] = useState([]);
	const { fetching, loggedIn, user } = props.data;
	const [viewCart, setViewCart] = useState(false);
	const [deliveryNotes, setDeliveryNotes] = useState('');
	const [
		createNewOrder,
	] = useMutation(CREATE_ORDER, {
		onCompleted(data) {
			Swal.fire(
				'Order Successfully Created!',
				'',
				'success'
			).then(() => {
				props.history.push('/orders')
			});
		}
	});

	const addToCart = (product) => {
		let tempCart = cart;
		tempCart.push(product);
		setCart(tempCart)
		console.log('cart', tempCart);
	}

	const orderProduct = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'Do you want to order these items?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No'
		}).then((result) => {
			if (result.value) {
				// Order Item
				createNewOrder({
					variables: {
						"data": {
							"deliveryNote": deliveryNotes,
							"products": {
								"connect": cart.map(i => { return { id: i.id } })
							},
							"status": "PENDING",
							"orderer": {
								"connect": {
									"id": user.id
								}
							}
						}
					}
				})
			}
		})
	}
	const clearCart = () => {
		setCart([]);
		setDeliveryNotes('');
		setViewCart(false);
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
		<div className="container">
			<Login />
			<div className="row">
				<div className="col s12">
					<h3 className="left">Show all products</h3>
				</div>
				{data.products.map(product => {
					return (
						<div className="col s12 m3 l3" key={product.id}>
							<div className={`card ${product.status === 'INACTIVE' ? 'inactive' : ''}`}>
								<div className="card-image">
									<img src={product.imageUrl} alt={product.name} />
									<span className="card-title">{product.name}</span>
								</div>
								<div className="card-content">
									<p>
										{product.description}
									</p>
								</div>
								<div className="card-action">
									<button className="btn waves-effect waves-light green" onClick={() => { addToCart(product) }}>
										Add to cart <i className="material-icons right">send</i>
									</button>
								</div>
							</div>
						</div>
					)
				})}
			</div>
			<div className="viewCart">
				<span onClick={() => { setViewCart(true) }}>View Cart</span> | <a href="/orders">View Orders</a>
			</div>
			{viewCart &&
				<div className="cartHolder">
					<div className="cart">
						<h2>Cart Items({cart.length})</h2>
						<div className="close" onClick={() => { setViewCart(false) }}>
							<i className="material-icons">close</i>
						</div>
						<div className="row">
							<div className="col s6 products">
								<div className="row">
									{cart.map(item => {
										return (
											<div className="col s6" key={`item-${item.id}`}>
												<div className="item">
													{item.name}
												</div>
											</div>
										)
									})}
								</div>
							</div>
							<div className="col s6 notes">
								<div class="input-field">
									<textarea
										id="textarea1"
										class="materialize-textarea"
										placeholder="Add Delivery Notes"
										value={deliveryNotes}
										onChange={(e) => { setDeliveryNotes(e.target.value) }}
									></textarea>
								</div>
							</div>
						</div>
						<div className="center-align">
							<button className="btn waves-effect waves-light green" onClick={orderProduct}>
								Order Items <i className="material-icons right">add_box</i>
							</button>
							{"  "}
							<button className="btn waves-effect waves-light red" onClick={clearCart}>
								Clear Cart <i className="material-icons right">delete_forever</i>
							</button>
						</div>
					</div>
				</div>
			}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		data: state.data
	}
};

export default connect(mapStateToProps)(Landing);