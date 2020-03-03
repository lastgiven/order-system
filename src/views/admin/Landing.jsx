import React from 'react';
import { connect } from 'react-redux';
import Login from "../../components/AdminLogin"

const Landing = (props) => {
	const { validAdmin } = props.data;

	if (!validAdmin) {
		return (
			<Login />
		)
	}

	return (
		<div>
			<Login />
			<div className="container">
				<div className="row">
					<div className="col s6">
						<a href="/admin/products" className="settings light-blue accent-3">
							<div className="c">
								Manage Products <br />
								<i class="material-icons">shopping_cart</i>
							</div>
						</a>
					</div>
					<div className="col s6 ">
						<a href="/admin/orders" className="settings green accent-3">
							<div className="c">
								Manage Orders <br />
								<i class="material-icons">local_shipping</i>
							</div>
						</a>
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

export default connect(mapStateToProps)(Landing);