import styles from "./ReportData.module.scss";
import { Pie } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { generateChartData } from "../../../utils/utils";
import {
  useAddReportDataMutation,
  useGetReportDataByReportIdQuery,
  useRemoveReportDataMutation
} from "../api/clientsApiSlice";
import type { TReportData } from "../../../types";
import { Info } from "../../../components/info/Info";
import { Button } from "../../../components/button/Button";
import { Spinner } from "../../../components/spinner/Spinner";

const DataEntry = ({ id, data }: { id: string, data: any }) => {
  const [removeReportData] = useRemoveReportDataMutation();

  const handleRemoveDataEntry = async (id: string) => {
    try {
      await removeReportData(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.dataEntry}>
      <Pie
        data={data}
      />
      <div
        className={styles.remove}
        onClick={() => handleRemoveDataEntry(id)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
    </div>
  );
};

export const ReportData = ({
  reportId,
  reportName
}: { reportId: string, reportName: string }) => {
  const { data: reportData = [], isLoading: isLoadingReportData } = useGetReportDataByReportIdQuery(reportId);
  const [addReportData, { isLoading: isAddingReportData}] = useAddReportDataMutation();

  const handleAddData = async () => {
    const chartData = generateChartData();

    try {
      await addReportData({
        reportId,
        chartData
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderReportData = () => {
    return reportData.map(
      ({ id, chartData }: TReportData) => <DataEntry key={id} id={id} data={chartData} />
    );
  };

  return (
    <div className={styles.reportData}>
      <Spinner isLoading={isLoadingReportData || isAddingReportData} />
      <div className={styles.header}>
        <span className={styles.headerText}>{reportName} Data</span>
        <Button
          text={"Add Data"}
          onClick={handleAddData}
          disabled={isAddingReportData}
        />
      </div>
      <div className={styles.list}>
        {reportData.length > 0 ? renderReportData() : <Info text={'No Data. Use "Add Data" button to add some.'} />}
      </div>
    </div>
  );
};