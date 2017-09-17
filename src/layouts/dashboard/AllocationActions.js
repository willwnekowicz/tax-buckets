import AllocationContract from '../../../build/contracts/Allocation.json'
import store from '../../store'

const contract = require('truffle-contract')

export const SUBMITTED_ALLOCATIONS = 'SUBMITTED_ALLOCATIONS'
function submittedAllocations(allocations) {
  return {
    type: SUBMITTED_ALLOCATIONS,
    payload: allocations
  }
}

export const UPDATED_ALLOCATIONS = 'UPDATED_ALLOCATIONS'
function updatedAllocations(allocationItems) {
  return {
    type: UPDATED_ALLOCATIONS,
    payload: allocationItems
  }
}

export function updateAllocations(allocationItems) {
  return function (dispatch) {
    dispatch(updatedAllocations(allocationItems))
  }
}


export function submitAllocations(allocations) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const allocationContract = contract(AllocationContract)
      allocationContract.setProvider(web3.currentProvider)

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        var allocationInstance

        allocationContract.deployed().then(function(instance) {
          allocationInstance = instance

          allocationInstance.submitAllocations(allocations, {from: coinbase})
            .then(function(result) {
              console.log('result', result)
              dispatch(submittedAllocations(result))
              return result
            })
            .catch(function(result) {
              console.error('Failed to submit allocations', result)
              return result
            })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
