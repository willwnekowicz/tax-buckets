import React from 'react';
import { Chart } from 'react-google-charts';

class GooglePieChart extends React.Component {
  render() {
    const { graphId, chartData } = this.props

    return (
      <div className={'my-pretty-chart-container'}>
        <Chart
          chartType="PieChart"
          data={chartData }
          options={{legend: 'none'}}
          graph_id={graphId}
          width="100%"
          height="400px"
          legend_toggle
        />
      </div>
    );
  }
}

export default GooglePieChart