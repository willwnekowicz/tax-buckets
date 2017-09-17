import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  sliderControl: {
    marginBottom: 10,
  },
  sliderTitle: {
  }
});


class SliderControl extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { item, value, classes } = this.props

    return (
      <div className={classes.sliderControl}>
        <Typography type="body1" component="p" className={classes.sliderTitle}>
          {item}
        </Typography>
        <input type="range"
               min="0"
               max="100"
               step="0.1"
               value={value}
               onChange={this.props.onChange}
        />
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

const SliderControlContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SliderControl)

export default withStyles(styles)(SliderControlContainer)
