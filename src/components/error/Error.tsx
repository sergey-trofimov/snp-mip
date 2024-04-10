import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import styles from "./Error.module.scss";

export const Error = ({ text } : { text: string }) => {
  return (
    <div className={styles.error}>
      <FontAwesomeIcon className={styles.icon} icon={faCircleExclamation} />
      <div className={styles.text}>{text}</div>
    </div>
  );
}