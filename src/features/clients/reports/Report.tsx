import styles from "./Report.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRemoveReportMutation } from "../api/clientsApiSlice";
import { useState } from "react";
import { ReportData } from "./ReportData";
import clsx from "clsx";
import { Spinner } from "../../../components/spinner/Spinner";

export const Report = ({
  id,
  name
}: { id: string, name: string }) => {
  const [showData, setShowData] = useState(true);
  const [removeReport, { isLoading: isRemovingReport }] = useRemoveReportMutation();

  const handleRemoveReport = async (id: string) => {
    try {
      await removeReport(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.report} key={id}>
      <Spinner isLoading={isRemovingReport} />
      <div className={styles.header}>
        <span
          className={styles.expand}
          onClick={() => setShowData(!showData)}
        >
          <FontAwesomeIcon
            icon={showData ? faChevronUp : faChevronDown}
          />
        </span>
        <span className={styles.name}>{name}</span>
        <span
          className={
            clsx(styles.remove, {
              [styles.disabled]: isRemovingReport
            })
          }
          onClick={() => handleRemoveReport(id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </div>
      {showData ? <ReportData reportName={name} reportId={id} /> : null}
    </div>
  );
};