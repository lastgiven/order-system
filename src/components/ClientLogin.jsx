import React, { useState } from 'react';
import { gql } from "apollo-boost";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

const GET_USERS = gql`
  query {
    users {
      id,
      name
    }
  }
`;

const CREATE_USER = gql`
 	 mutation CreateUser($data: UserCreateInput!){
		createUser(data: $data){
			name,
			id,
			orders{
				id
			}
		}
	}
`;

const LogIn = (props) => {
	const getUsers = useQuery(GET_USERS);
	const { fetching, loggedIn, user } = props.data;
	const [name, setName] = useState('');
	const [login, setLogin] = useState(true);
	const [
		createNewUser,
	] = useMutation(CREATE_USER, {
		onCompleted(data) {
			Swal.fire(
				'CREATE USER!',
				'',
				'success'
			).then(() => {
				props.dispatch({ type: 'LOGIN_USER_FULFILLED', payload: data.createUser })
			});
		}
	});

	const getUserList = () => {
		if (getUsers.loading) {
			return (
				<div className="loading">
					Fetching
				</div>
			)
		}
		if (getUsers.error) {
			return (
				<div className="loading">
					oooooops
				</div>
			)
		}

		return (
			<div className="getUsers">
				<div className="listUsers">
					{getUsers.data.users.map(user => {
						return (
							<div className="user" key={user.id} onClick={() => { selectUser(user) }}>
								{user.name}
							</div>
						)
					})}
				</div>
				<button className="waves-effect waves-light btn right red" onClick={() => setLogin(!login)}>create account?</button>
			</div>
		)
	}

	const selectUser = (userData) => {
		props.dispatch({ type: 'LOGIN_USER_FULFILLED', payload: userData })
		Swal.fire(
			'USER SELECTED!',
			'',
			'success'
		);
	};
	const createUser = () => {
		createNewUser({
			variables: {
				"data": {
					"name": name
				}
			}
		});
	};
	const logOut = () => {
		props.dispatch({type: 'LOGOUT_USER'})
	}
	// Render component
	if (fetching) {
		return (
			<div className="loading">
				Fetching
			</div>
		)
	}
	return (
		<div className="container">
			{loggedIn ? (
				<div className="loggedInAs">
					Logged in as <span>{user.name}</span> | <span onClick={logOut}>Log Out</span>
				</div>
			) :
				<div className="loginModelHolder" >
					<div className="loginModel">
						<h2>Please log in</h2>
						<div className={`form ${login ? 'login' : 'createAccount'}`}>
							<div className="login">
								{getUserList()}
							</div>
							<div className="createAccount">
								<div className="input-field">
									<input
										placeholder="Enter Name"
										type="text"
										value={name}
										onChange={(e) => { setName(e.target.value) }}
										id="createName"
									/>
									<button className="waves-effect waves-light btn" onClick={createUser}>Create Account</button>
									<button className="waves-effect waves-light btn right red" onClick={() => setLogin(!login)}>Login?</button>
								</div>
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