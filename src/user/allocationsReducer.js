const initialState = {
  submitted: false,
}

const allocationsReducer = (state = initialState, action) => {
  if (action.type === 'SUBMITTED_ALLOCATIONS')
  {
    return Object.assign({}, state, {
      submitted: true,
    })
  }

  return state
}

export default allocationsReducer
