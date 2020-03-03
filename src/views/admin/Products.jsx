import React, { useState } from 'react';
import { connect } from 'react-redux';
import Login from "../../components/AdminLogin";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2';

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

const CREATE_PRODUCT = gql`
	mutation CreateProduct($data: ProductCreateInput!){
		createProduct(data: $data){
			id,
			name,
			description,
			imageUrl,
			status
		}
	}
`;
const UPDATE_PRODUCT = gql`
	mutation UpdateProduct(
		$data: ProductUpdateInput!
		$where: ProductWhereUniqueInput!
	) {
		updateProduct(data: $data, where: $where) {
			id
		}
	}
`;

const Products = (props) => {
	const { validAdmin } = props.data;
	const { loading, error, data } = useQuery(GET_PRODUCTS, {
		pollInterval: 500,
	});
	const [addProduct, setAddProduct] = useState(false);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [
		createNewProduct,
	] = useMutation(CREATE_PRODUCT, {
		onCompleted(data) {
			setAddProduct(false);
			Swal.fire(
				'Product Added!',
				'',
				'success'
			);
		}
	});
	const [
		updateProduct,
	] = useMutation(UPDATE_PRODUCT);

	const createProduct = () => {
		createNewProduct({
			variables: {
				"data": {
					"name": name,
					"description": description,
					"status": "ACTIVE",
					"imageUrl": imageUrl
				}
			}
		})
	}

	const changeStatus = (id, status) => {
		updateProduct({
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
			<div className="container products">
				<div className="row">
					<div className="col s12">
						<h3 className="left">List Products</h3>
						<button className="waves-effect waves-light btn right" onClick={() => { setAddProduct(true) }}>Add Product</button>
					</div>
					<div className="col s12">
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Description</th>
									<th>Image</th>
									<th>Status</th>
									<th>Tools</th>
								</tr>
							</thead>

							<tbody>
								{data.products.map(product => {
									return (
										<tr>
											<td>{product.name}</td>
											<td>{product.description}</td>
											<td>
												<img src={product.imageUrl} />
											</td>
											<td>{product.status}</td>
											<td>
												{product.status === "INACTIVE" ?
													<button className="waves-effect waves-light btn right green" onClick={() => { changeStatus(product.id, "ACTIVE") }}>Enable</button>
													:
													<button className="waves-effect waves-light btn right" onClick={() => { changeStatus(product.id, "INACTIVE") }}>Disable</button>
												}
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
					{addProduct && (
						<div className="addProductHolder">
							<div className="addProduct">
								<h4>Add Product:</h4>
								<div className="row">
									<div className="col s6">
										<input
											placeholder="Enter Name"
											type="text"
											value={name}
											onChange={(e) => { setName(e.target.value) }}
											id="createName"
										/>
									</div>
									<div className="col s6">
										<input
											placeholder="Enter Description"
											type="text"
											value={description}
											onChange={(e) => { setDescription(e.target.value) }}
											id="createName"
										/>
									</div>
									<div className="col s6">
										<input
											placeholder="Enter Image URL"
											type="text"
											value={imageUrl}
											onChange={(e) => { setImageUrl(e.target.value) }}
											id="createName"
										/>
									</div>
									<div className="col s12">
										<button className="waves-effect waves-light btn left" onClick={createProduct}>Save</button>
										<button className="waves-effect waves-light btn right red" onClick={() => { setAddProduct(false) }}>Cancel</button>
									</div>
								</div>
							</div>
						</div>
					)}
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

export default connect(mapStateToProps)(Products);