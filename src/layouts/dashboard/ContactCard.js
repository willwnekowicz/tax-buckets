import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 40,
    paddingBottom: 40,
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center',
  }),
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  inputLabel: {
    color: '#0096FB',
  },
  section: {
    marginTop: 40,
    paddingTop: 40,
    borderTop: '1px dashed #555',
  }
});

class ContactCard extends Component {
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

  handleStart = () => {
    this.props.submitTaxAmount(this.state.taxAmount)
  }

  render() {
    const classes = this.props.classes
    const user = this.props.user

    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="headline" component="h3">
          Thanks for submitting your 2018 Budget Allocations.
        </Typography>
        <div className={classes.section}>
          <Typography type="title" component="p">
            Donate: buckets.eth
          </Typography>
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const ContactCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactCard)

export default withStyles(styles)(ContactCardContainer)
