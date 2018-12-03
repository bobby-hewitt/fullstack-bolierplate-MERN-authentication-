const initialState = {
	authRoute: '/home',
	loader:null
}

export default (state = initialState, action) => {
  switch (action.type) {
  	 case 'SET_LOADER':
      return {
        ...state,
        loader: action.payload
      }
    default:
      return state
  }
}
