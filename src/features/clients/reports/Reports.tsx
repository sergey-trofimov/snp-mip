import styles from "./Reports.module.scss";
import { Report } from "./Report";
import { useAddReportMutation, useGetReportsByClientQuery } from "../api/clientsApiSlice";
import { colors, names, uniqueNamesGenerator } from "unique-names-generator";
import { Info } from "../../../components/info/Info";
import { Button } from "../../../components/button/Button";
import { Spinner } from "../../../components/spinner/Spinner";

export const Reports = ({ clientId, clientName }: { clientId: string, clientName: string }) => {
  const { data: reports = [], isLoading: isLoadingReports } = useGetReportsByClientQuery(clientId);
  const [addReport, { isLoading: isAddingReport }] = useAddReportMutation();

  const handleAddReport = async () => {
    const name = uniqueNamesGenerator({
      dictionaries: [colors, names],
      separator: " ",
      length: 2,
      style: "capital"
    });

    try {
      await addReport({ clientId, name: `Report "${name}"`, data: [] }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const renderReports = () => {
    return reports.map(({ id, name }) => <Report key={id} id={id} name={name} />);
  };

  return (
    <div className={styles.reports}>
      <Spinner isLoading={isLoadingReports || isAddingReport} />
      <div className={styles.header}>
        <span className={styles.headerText}>{clientName} Reports</span>
        <Button
          text={"Add Report"}
          onClick={handleAddReport}
          disabled={isLoadingReports || isAddingReport}
        />
      </div>
      <div className={styles.list}>
        {reports.length > 0 ? renderReports() : <Info text={'No Reports. Use "Add Report" button to add one.'} />}
      </div>
    </div>
  );
};