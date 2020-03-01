export default function reducer(state = {
	user: {
		id: null,
		name: null,
		orders: null,
	},
	fetching: false,
	loggedIn: false,
	error: null
}, action) {
	switch (action.type) {
		case "LOGIN_USER":
			{
				return { ...state,
					fetching: true
				};
			}
		case "LOGIN_USER_REJECTED":
			{
				return { ...state,
					fetching: false,
					error: action.payload
				};
			}
		case "LOGIN_USER_FULFILLED":
			{
				return { ...state,
					loggedIn: true,
					fetching: false,
					user: action.payload
				};
			}
		case "LOGOUT_USER":
				{
					return { ...state,
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
		default:
			{
				return { ...state,
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