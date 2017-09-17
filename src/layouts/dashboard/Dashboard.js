import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'

import WelcomeCard from './WelcomeCard'
import AllocationCard from './AllocationCard'
import ContactCard from './ContactCard'


const styles = theme => ({

});


class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    const { authData, tax } = this.props
    const hasTaxAmount = tax && tax.taxAmount
    const allocationsSubmitted = this.props.allocationsSubmitted

    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
          {hasTaxAmount ? null : (<WelcomeCard user={authData} />)}
          {!hasTaxAmount || allocationsSubmitted ? null : (<AllocationCard user={authData} />) }
          {allocationsSubmitted ? (<ContactCard />) : null}
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tax: state.tax,
    allocationsSubmitted: state.allocations.submitted,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default withStyles(styles)(DashboardContainer)
