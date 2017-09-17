import React, { Component } from 'react'
import { connect } from 'react-redux'

import { submitTaxAmount } from './DashboardActions'

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
  section: {
    marginTop: 40,
    paddingTop: 40,
    borderTop: '1px dashed #555',
  }
});

class WelcomeCard extends Component {
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
          <strong>{user.name}</strong>,
          <br />
          TaxBuckets lets you decide how to allocate up to 10% of your taxes.
        </Typography>
        <div className={classes.section}>
          <Typography type="title" component="p">
            How much do you expect to pay in taxes in 2017?
          </Typography>
          <TextField
            id="taxAmount"
            autoFocus
            label="2017 Federal Tax Amount"
            onChange={this.handleChange('taxAmount')}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <br />
          <br />
          <Button raised
                  color="primary"
                  className={classes.button}
                  onClick={() => this.handleStart()}
          >
            Let's Start
          </Button>
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
    submitTaxAmount: (amount) => dispatch(submitTaxAmount(amount))
  }
}

const WelcomeCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeCard)

export default withStyles(styles)(WelcomeCardContainer)
