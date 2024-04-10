import styles from "./Info.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export const Info = ({ text } : { text: string }) => {
  return (
    <div className={styles.info}>
      <FontAwesomeIcon className={styles.icon} icon={faCircleInfo} />
      <div className={styles.text}>{text}</div>
    </div>
  );
}