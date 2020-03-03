export default function reducer(state = {
	user: {
		id: null,
		name: null,
		orders: null,
	},
	fetching: false,
	loggedIn: false,
	validAdmin: false,
	error: null
}, action) {
	switch (action.type) {
		case "LOGIN_USER":
			{
				return {
					...state,
					fetching: true
				};
			}
		case "LOGIN_USER_REJECTED":
			{
				return {
					...state,
					fetching: false,
					error: action.payload
				};
			}
		case "LOGIN_USER_FULFILLED":
			{
				return {
					...state,
					loggedIn: true,
					fetching: false,
					user: action.payload
				};
			}
		case "LOGOUT_USER":
			{
				return {
					...state,
					fetching: false,
					loggedIn: false,
					error: null,
					user: {
						id: null,
						name: null,
						orders: null,
					},
				};
			}
		case "LOGIN_ADMIN":
			{
				return {
					...state,
					validAdmin: true,
				};
			}
		case "LOGOUT_ADMIN":
			{
				return {
					...state,
					validAdmin: false,
				};
			}
		default:
			{
				return {
					...state,
					fetching: false,
					loggedIn: false,
					error: null,
					user: {
						id: null,
						name: null,
						orders: null,
					},
				};
			}
	}
}