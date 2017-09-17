const initialState = {
  taxAmount: null
}

const taxReducer = (state = initialState, action) => {
  if (action.type === 'SUBMITTED_TAX_AMOUNT')
  {
    return Object.assign({}, state, {
      taxAmount: action.payload
    })
  }

  return state
}

export default taxReducer
