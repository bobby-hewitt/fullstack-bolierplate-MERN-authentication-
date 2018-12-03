const initialState = {
  place: null,
  email: null,
  password: null,
  confirmPassword: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PAIR':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      }
    default:
      return state
  }
}
