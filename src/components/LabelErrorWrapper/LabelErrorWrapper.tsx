import { ReactElement, FC } from "react";
import classNames from "classnames";

//styles
import styles from "@/styles/components/labelErrorWrapper.module.scss";

type LabelErrorWrapperType = {
    className?: string,
    error?: string | null,
    label?: string,
    children: ReactElement;
}

const LabelErrorWrapper: FC<LabelErrorWrapperType> = (props) => {
  const { className, error = "", label = "", children } = props;

  return (
    <div className={classNames(styles.wrapper, className)}>
      {label && <label>{label}</label>}
      {children}
      {error && <p>{error}</p>}
    </div>
  );
};

export default LabelErrorWrapper;