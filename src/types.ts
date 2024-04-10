type TDataSet = {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

type TChartData = {
  labels: string[];
  datasets: TDataSet[];
}

export type TReportData = {
  id: string;
  reportId: string;
  chartData: TChartData;
}

export type TReport = {
  id: string;
  clientId: string;
  name: string;
}

export type TClient = {
  id: string;
  name: string;
}