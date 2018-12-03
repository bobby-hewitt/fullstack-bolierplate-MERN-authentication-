export const setUser = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      payload
    })
  }
}
