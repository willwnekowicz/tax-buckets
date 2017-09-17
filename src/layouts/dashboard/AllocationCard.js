import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import GooglePieChart from './GooglePieChart'
import SwipeableViews from 'react-swipeable-views';
import Tabs, { Tab } from 'material-ui/Tabs';

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

function TabContainer(props) {
  return <div style={{ padding: 20 }}>{props.children}</div>;
}

class AllocationCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      ]
    }
  }

  handleChange = (event, value) => {
    this.setState({ tabValue: value });
  }

  handleChangeIndex = index => {
    this.setState({ tabValue: index });
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
        <br />
        <Tabs
          value={this.state.tabValue}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
          centered
        >
          <Tab label="Discretionary Budget ($1.070 T)" />
          <Tab label="Mandatory Budget ($2.573 T)" />
          <Tab label={`Total Budget ($4.021 T)`} />
        </Tabs>
        <SwipeableViews index={this.state.tabValue} onChangeIndex={this.handleChangeIndex}>
          <TabContainer>
            <GooglePieChart
              graphId="discretionary"
              chartData={this.state.discretionaryData}
            />
          </TabContainer>
          <TabContainer>
            <GooglePieChart
              graphId="mandatory"
              chartData={this.state.mandatoryData}
            />
          </TabContainer>
          <TabContainer>
            <GooglePieChart
              graphId="total"
              chartData={this.state.totalData}
            />
          </TabContainer>
        </SwipeableViews>
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
