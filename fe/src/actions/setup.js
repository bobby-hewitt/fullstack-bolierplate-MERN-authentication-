export const setLoader = (payload) => {
  return dispatch => {
    dispatch({
      type: 'SET_LOADER',
      payload
    })
  }
}
