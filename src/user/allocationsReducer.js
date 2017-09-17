const initialState = {

}

const allocationsReducer = (state = initialState, action) => {
  if (action.type === 'UPDATED_ALLOCATIONS')
  {
    return Object.assign({}, state, {
      items: action.payload.allocationItems
    })
  }

  return state
}

export default allocationsReducer
