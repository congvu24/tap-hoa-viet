import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryScatter,
} from 'victory-native';
import {PRIMARY_COLOR} from '../../../constants/Colors';
import {formatMoney} from '../../../utils';

const data = [
  {startDate: 1, earnings: 13000},
  {startDate: 8, earnings: 16500},
  {startDate: 15, earnings: 14250},
  {startDate: 22, earnings: 19000},
  {startDate: 29, earnings: 10000},
];

const getDateRangeOfMonth = () => {
  const date = new Date();
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
  const lastDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();
  return {
    firstDate,
    lastDate,
  };
};

const {width: screenWidth} = Dimensions.get('screen');

export function WeeklyIncomeChart() {
  const {lastDate} = getDateRangeOfMonth();
  return (
    <View style={styles.rootContainer}>
      <VictoryChart
        width={screenWidth - 80}
        style={styles.chartContainer}
        theme={VictoryTheme.material}
        domainPadding={{x: [20, 50], y: [15, 25]}}
        padding={{top: 20, bottom: 40, left: 60, right: 10}}
      >
        <VictoryLine
          data={data}
          x={datum =>
            datum.startDate === 29
              ? `29-${lastDate}`
              : `${datum.startDate}-${datum.startDate + 7}`
          }
          y="earnings"
          interpolation="cardinal"
          // animate={{duration: 2000, onLoad: 500}}
          padding={100}
          style={{
            data: {
              stroke: PRIMARY_COLOR,
              strokeWidth: 2,
            },
          }}
          labels={({datum}) => formatMoney(datum.earnings)}
          labelComponent={
            <VictoryLabel
              fixLabelOverlap
              dy={-10}
              dx={20}
              style={styles.lineLabel}
            />
          }
        />
        <VictoryScatter
          style={{data: {fill: PRIMARY_COLOR}}}
          size={4}
          data={data}
          x={datum =>
            datum.startDate === 29
              ? `29-${lastDate}`
              : `${datum.startDate}-${datum.startDate + 7}`
          }
          y="earnings"
        />
        <VictoryAxis
          dependentAxis
          label="Doanh thu (VND)"
          axisLabelComponent={<VictoryLabel y={18} x={0} angle={0} />}
          style={{
            axis: {
              fill: PRIMARY_COLOR,
              strokeWidth: 1,
            },
            axisLabel: {
              textAnchor: 'start',
            },
            ticks: {
              stroke: PRIMARY_COLOR,
            },
            grid: {stroke: 'transparent'},
          }}
          tickFormat={value => formatMoney(value)}
        />
        <VictoryAxis
          label="Tuần"
          style={{
            axisLabel: {textAnchor: 'middle', padding: 25},
            ticks: {
              stroke: PRIMARY_COLOR,
            },
            tickLabels: {
              padding: 2,
            },
            grid: {stroke: 'transparent'},
          }}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    borderRadius: 6,
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  },
  chartContainer: {
    flex: 1,
    width: '100%',
    marginHorizontal: 30,
  },
  lineLabel: {fontSize: 12},
});
