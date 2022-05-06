import React from 'react';
import {StyleSheet, View} from 'react-native';
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory-native';

const data = [
  {week: '1', earnings: 13000},
  {week: '2', earnings: 16500},
  {week: '3', earnings: 14250},
  {week: '4', earnings: 19000},
];

export function WeeklyIncomeChart() {
  return (
    <View style={styles.rootContainer}>
      <VictoryChart style={styles.chartContainer} theme={VictoryTheme.material}>
        <VictoryLine data={data} x="week" y="earnings" padding={100} />
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
  },
  chartContainer: {
    width: '100%',
  },
});
