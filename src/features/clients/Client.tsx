import styles from "./Client.module.scss";
import type { TClient } from "../../types";
import { useRemoveClientMutation } from "./api/clientsApiSlice";
import { useState } from "react";
import { Reports } from "./reports/Reports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "../../components/spinner/Spinner";
import clsx from "clsx";

export const Client = (params: TClient) => {
  const { id, name } = params;

  const [showReports, setShowReports] = useState(true);

  const [removeClient, { isLoading: isRemovingClient }] = useRemoveClientMutation();

  const handleRemoveClient = async (id: string) => {
    try {
      await removeClient(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={name} className={styles.client}>
      <Spinner isLoading={isRemovingClient} />
      <div className={styles.header}>
        <span
          className={styles.expand}
          onClick={() => setShowReports(!showReports)}
        >
          <FontAwesomeIcon icon={showReports ? faChevronUp : faChevronDown} />
        </span>
        <span className={styles.name}>{name}</span>
        <span
          className={
            clsx(styles.remove, {
              [styles.disabled]: isRemovingClient
            })
          }
          onClick={() => handleRemoveClient(id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </div>
      <div>
        {showReports && <Reports clientId={id} clientName={name} />}
      </div>
    </div>
  );
};