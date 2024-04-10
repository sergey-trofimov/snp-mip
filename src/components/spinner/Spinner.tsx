import styles from "./Spinner.module.scss";

export const Spinner = ({
  isLoading
} : { isLoading: boolean }) => {
  return isLoading ? (
    <div className={styles.spinner}>
      <div className={styles.loading} />
    </div>
  ) : null;
}