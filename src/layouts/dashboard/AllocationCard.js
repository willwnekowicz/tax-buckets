import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 40,
    paddingBottom: 40,
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center',
  }),
  allocatableAmount: {
    color: '#3B8EA5',
    fontWeight: '600',
  },
  section: {
    marginTop: 40,
    paddingTop: 40,
    borderTop: '1px dashed #555',
  }
});

class AllocationCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taxAmount: null
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
    const classes = this.props.classes
    const { allocatableAmount } = this.props

    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="headline" component="h3">
          You have <span className={classes.allocatableAmount}>${allocatableAmount}</span> to allocate.
        </Typography>
        <div className={classes.section}>
          <Typography type="title" component="p">
            Here's what the Federal Budget looks like?
          </Typography>
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    allocatableAmount: '1000',
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const AllocationCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllocationCard)

export default withStyles(styles)(AllocationCardContainer)
