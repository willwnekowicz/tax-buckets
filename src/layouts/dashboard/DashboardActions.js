import store from '../../store'


export const SUBMITTED_TAX_AMOUNT = 'SUBMITTED_TAX_AMOUNT'
function submittedTaxAmount(taxAmount) {
  return {
    type: SUBMITTED_TAX_AMOUNT,
    payload: taxAmount
  }
}

export function submitTaxAmount(taxAmount) {
  return function(dispatch) {
    dispatch(submittedTaxAmount(taxAmount))
  }
}
