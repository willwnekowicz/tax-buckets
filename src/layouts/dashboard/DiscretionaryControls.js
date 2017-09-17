import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'

import SliderControl from './SliderControl'

const styles = theme => ({

});


class DiscretionaryControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {name: 'Military', percentage: 48.23},
        {name: 'Education', percentage: 6.35},
        {name: 'Energy', percentage: 3.53},
        {name: 'Nuclear Weapons', percentage: 1.20},
        {name: 'Health & Human Services', percentage: 6.86},
        {name: 'Homeland Security', percentage: 3.96},
        {name: 'Housing & Urban Development', percentage: 3.62},
        {name: 'Justice', percentage: 1.69},
        {name: 'NASA', percentage: 1.84},
        {name: 'State Department', percentage: 3.42},
        {name: 'Veterans Affairs', percentage: 7.01},
        {name: 'Other', percentage: 12.04}
      ]
    }
  }

  handleChange = (event, index) => {
    let newItems = [...this.state.items]
    newItems[index].percentage = parseFloat(event.target.value)
    this.setState({ items: newItems });
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={4}>
            { Object.keys(this.state.items.slice(0,4)).map((index) => {
              let item = this.state.items[index]
              return (
                <div key={index}>
                  <SliderControl item={item.name}
                                 value={item.percentage}
                                 onChange={(e) => this.handleChange(e, index)} />
                </div>
              )
            })}
          </Grid>
          <Grid item xs={4}>
            { Object.keys(this.state.items.slice(4,8)).map((index) => {
              let item = this.state.items.slice(4,8)[index]
              return (
                <div key={index}>
                  <SliderControl item={item.name}
                                 value={item.percentage}
                                 onChange={(e) => this.handleChange(e, index + 4)} />
                </div>
              )
            })}
          </Grid>
          <Grid item xs={4}>
            { Object.keys(this.state.items.slice(8,12)).map((index) => {
              let item = this.state.items.slice(8,12)[index]
              return (
                <div key={index}>
                  <SliderControl item={item.name}
                                 value={item.percentage}
                                 onChange={(e) => this.handleChange(e, index + 8)} />
                </div>
              )
            })}
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const DiscretionaryControlsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscretionaryControls)

export default withStyles(styles)(DiscretionaryControlsContainer)
