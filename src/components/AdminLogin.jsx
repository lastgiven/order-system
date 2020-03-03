import React, { useState } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

const LogIn = (props) => {
	const { validAdmin } = props.data;
	const [pw, setPw] = useState("");
	const logOut = () => {
		props.dispatch({type: 'LOGOUT_ADMIN'})
	}
	const logIn = () => {
		if(pw === "20245687952135"){
			props.dispatch({type: 'LOGIN_ADMIN'})
		} else {
			Swal.fire(
				'Incorrect Password!',
				'Please check read me for PW',
				'error'
			);
		}
	}
	return (
		<div className="container">
			{validAdmin ? (
				<div className="loggedInAs">
					<span onClick={logOut}>Log Out</span>
				</div>
			) :
				<div className="loginModelHolder" >
					<div className="loginModel">
						<h2>Please log in</h2>
						<div className={`form login`}>
							<div className="login">
							<input
							placeholder="Enter Name"
							type="password"
							value={pw}
							onChange={(e) => { setPw(e.target.value) }}
							id="createName"
						/>
						<button className="waves-effect waves-light btn" onClick={logIn}>Login</button>
							</div>
						</div>
					</div>
				</div>}
		</div>
	)
}

const mapStateToProps = (state) => {
	console.log(state)
	return {
		data: state.data
	}
};

export default connect(mapStateToProps)(LogIn);