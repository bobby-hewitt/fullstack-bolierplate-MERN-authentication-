export const setPair = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_PAIR',
      payload
    })
  }
}
