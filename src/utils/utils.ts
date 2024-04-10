import { random } from 'lodash';
export const generateChartData = () => {
  const getArrayOfRandomNumbers = () => {
    return Array.from({ length: random(2, 6) }, () => random(0, 100));
  }

  const colors = [
    'rgba(255, 0, 0, 0.7)',
    'rgba(0, 0, 255, 0.7)',
    'rgba(0, 255, 0, 0.7)',
    'rgba(255, 255, 0, 0.7)',
    'rgba(255, 0, 255, 0.7)',
    'rgba(0, 255, 255, 0.7)',
  ];

  return {
    labels: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
    datasets: [
      {
        label: 'Some Values',
        data: getArrayOfRandomNumbers(),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  }
}
