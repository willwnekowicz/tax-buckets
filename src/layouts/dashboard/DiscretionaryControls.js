import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { updateAllocations } from './AllocationActions'

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
    let startingValue = newItems[index].percentage
    let endingValue = parseFloat(event.target.value)

    newItems = _.map(newItems, (item) => {
      item.percentage = item.percentage - ((endingValue - startingValue) / 12)
      if(item.percentage < 0) {
        item.percentage = 0.0
      } else if(item.percentage > 100) {
        item.percentage = 100.0
      }
      return item
    })

    newItems[index].percentage = endingValue
    this.setState({items: newItems})
    this.props.handleChange(newItems)
  }

  render() {
    const { disable } = this.props
    let allocationItems = this.state.items

    return (
      <div>
        <Grid container>
          <Grid item xs={4}>
            { Object.keys(allocationItems.slice(0,4)).map((index) => {
              let item = allocationItems[index]
              return (
                <div key={index}>
                  <SliderControl item={item.name}
                                 value={item.percentage}
                                 disable={disable}
                                 onChange={(e) => this.handleChange(e, index)} />
                </div>
              )
            })}
          </Grid>
          <Grid item xs={4}>
            { Object.keys(allocationItems.slice(4,8)).map((index) => {
              let item = allocationItems.slice(4,8)[index]
              return (
                <div key={parseInt(index)+4}>
                  <SliderControl item={item.name}
                                 value={item.percentage}
                                 disable={disable}
                                 onChange={(e) => this.handleChange(e, parseInt(index) + 4)} />
                </div>
              )
            })}
          </Grid>
          <Grid item xs={4}>
            { Object.keys(allocationItems.slice(8,12)).map((index) => {
              let item = allocationItems.slice(8,12)[index]
              return (
                <div key={parseInt(index)+8}>
                  <SliderControl item={item.name}
                                 value={item.percentage}
                                 disable={disable}
                                 onChange={(e) => this.handleChange(e, parseInt(index) + 8)} />
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
    // allocationItems: state.allocations && state.allocations.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // updateAllocations: (allocations) => dispatch(updateAllocations(allocations))
  }
}

const DiscretionaryControlsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscretionaryControls)

export default withStyles(styles)(DiscretionaryControlsContainer)
