import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { submitAllocations } from './AllocationActions'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import GooglePieChart from './GooglePieChart'
import SwipeableViews from 'react-swipeable-views'
import Tabs, { Tab } from 'material-ui/Tabs'
import Button from 'material-ui/Button'

import DiscretionaryControls from './DiscretionaryControls'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 40,
    paddingBottom: 40,
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center',
  }),
  allocatableAmount: {
    color: '#0096FB',
    fontWeight: '600',
  },
  section: {
    marginTop: 40,
    paddingTop: 40,
    borderTop: '1px dashed #555',
  }
});

function TabContainer(props) {
  return <div style={{ padding: 20 }}>{props.children}</div>;
}

class AllocationCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disableControls: false,
      taxAmount: null,
      tabValue: 0,
      discretionaryData: [
        ['Item','Spending'],
        ['Military',516.10],
        ['Education',68.00],
        ['Energy',37.80],
        ['Nuclear Weapons',12.90],
        ['Health & Human Services',73.50],
        ['Homeland Security',42.40],
        ['Housing & Urban Development',38.80],
        ['Justice',18.10],
        ['NASA',19.70],
        ['State Department',36.60],
        ['Veterans Affairs',75.10],
        ['Other',128.90],
      ],
      mandatoryData: [
        ['Item','Spending'],
        ['Social Security',	946],
        ['Medicare', 593],
        ['Medicaid', 378],
        ['Other', 656],
      ],
      totalData: [
        ['Item','Spending'],
        ['Discretionary',	1070],
        ['Mandatory', 2573],
        ['Interest on Debt', 276],
      ],
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

  handleChange = (event, value) => {
    this.setState({ tabValue: value });
  }

  handleChangeIndex = index => {
    this.setState({ tabValue: index });
  }

  handleControlChange = items => {
    this.formatChartData(items)
    this.setState({items: [...items]})
  }

  formatChartData = items => {
    let chartData = _.map(items, (item) => {
      return [item.name, item.percentage]
    })

    chartData = [['Item', 'Spending'], ...chartData]
    this.setState({discretionaryData: chartData})
  }

  handleSubmit() {
    const allocations = _.map(this.state.items, (item) => item.percentage * 100)
    this.props.submitAllocations(allocations)
    this.setState({disableControls: true})
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
            Here's what the Federal Budget looks like
          </Typography>
          <Typography type="subheading" component="p">
            Move the sliders to set the budget to what you think it should be.
          </Typography>
        </div>
        <br />
        <Tabs
          value={this.state.tabValue}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
          centered
        >
          <Tab label="Discretionary Budget" />
          <Tab label="Mandatory Budget" />
          <Tab label="Total Budget" />
        </Tabs>
        <SwipeableViews index={this.state.tabValue} onChangeIndex={this.handleChangeIndex}>
          <TabContainer>
            <br />
            <Typography type="title" component="p">
              2018 Discretionary Budget
            </Typography>
            <Typography type="subheading" component="p">
              ($1.070 T)
            </Typography>
            <GooglePieChart
              graphId="discretionary"
              chartData={this.state.discretionaryData}
            />
            <DiscretionaryControls disable={this.state.disableControls}
                                   handleChange={this.handleControlChange}
            />
            <br />
            { !this.state.disableControls ? (
              <Button raised
                      color="primary"
                      className={classes.button}
                      disabled={this.state.disableControls}
                      onClick={() => this.handleSubmit()}>
                Submit Allocation
              </Button>
              ): (<p>Thanks for submitting your budget allocations for 2018!</p>)}
          </TabContainer>
          <TabContainer>
            <br />
            <Typography type="title" component="p">
              2018 Mandatory Budget
            </Typography>
            <Typography type="subheading" component="p">
              ($2.573 T)
            </Typography>
            <GooglePieChart
              graphId="mandatory"
              chartData={this.state.mandatoryData}
            />
            <br />
            <br />
            <Typography type="subheading" component="p">
              The Mandatory budget includes existing committments that must be paid and cannot be change.
            </Typography>
          </TabContainer>
          <TabContainer>
            <br />
            <Typography type="title" component="p">
              2018 Total Budget
            </Typography>
            <Typography type="subheading" component="p">
              ($4.021 T)
            </Typography>
            <GooglePieChart
              graphId="total"
              chartData={this.state.totalData}
            />
            <br />
            <br />
            <Typography type="subheading" component="p">
              The Total budget includes Discretionary spending, Mandatory spending, and Interest on Debt.
            </Typography>
          </TabContainer>
        </SwipeableViews>
      </Paper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    allocatableAmount: parseFloat(state.tax && state.tax.taxAmount) / 10
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitAllocations: (allocations) => dispatch(submitAllocations(allocations))
  }
}

const AllocationCardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllocationCard)

export default withStyles(styles)(AllocationCardContainer)
