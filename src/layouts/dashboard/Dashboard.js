import React, { Component } from 'react'

import WelcomeCard from './WelcomeCard'
import AllocationCard from './AllocationCard'


class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    const { authData } = this.props

    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
          <WelcomeCard user={authData} />
          <AllocationCard user={authData} />
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
