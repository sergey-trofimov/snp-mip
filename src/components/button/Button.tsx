import styles from "./Button.module.scss";
import clsx from "clsx";

type TButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button = (props: TButtonProps) => {
  const {
    text,
    onClick,
    disabled
  } = props;
  return (
    <button
      className={
        clsx(styles.button, {
          [styles.disabled]: disabled,
        })
      }
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}