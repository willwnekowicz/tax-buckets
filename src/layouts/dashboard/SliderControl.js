import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  sliderControl: {
    position: 'relative',
    marginBottom: 10,
    padding: 5,
    background: '#f3f3f3',
    border: '1px solid #aaa',
    borderRadius: 2,
    textAlign: 'left',
  },
  sliderTitle: {
    textAlign: 'left',
    marginLeft: 10,
  },
  printedValue: {
    marginLeft: 10,
    fontSize: 12,
  },
  printedDollarAmount: {
    position: 'absolute',
    right: 8,
    top: 15,
    border: '1px solid #ccc',
    borderRadius: 12,
    padding: '3px 6px',
    fontSize: 13,
  },
  sliderInput: {
    marginTop: 5,
    marginLeft: 20,
    verticalAlign: 'top',
  }
});


class SliderControl extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { item, value, classes, disable, allocatableAmount } = this.props
    let printedValue = parseFloat(value).toFixed(2)
    let printedDollarAmount = (parseFloat(value) / 100 * allocatableAmount).toFixed(2)

    return (
      <div className={classes.sliderControl}>
        <Typography type="body1" component="p" className={classes.sliderTitle}>
          {item}
        </Typography>
        <input className={classes.sliderInput}
               type="range"
               min="0"
               max="100"
               step="0.3"
               value={value}
               disabled={disable}
               onChange={this.props.onChange}
        />
        <span className={classes.printedValue}>{printedValue}%</span>
        <div className={classes.printedDollarAmount}>${printedDollarAmount}</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    allocatableAmount: state.tax && state.tax.taxAmount / 10
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const SliderControlContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SliderControl)

export default withStyles(styles)(SliderControlContainer)
