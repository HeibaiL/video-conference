import { FC, ChangeEvent } from "react";
import { Input as AntdInput } from "antd";
import classNames from "classnames";

//components
import LabelErrorWrapper from "@/components/LabelErrorWrapper";

import styles from "@/styles/components/input.module.scss";

type InputType = {
  className?: string,
  error?: string | null,
  label?: string,
  onChange: (_e: ChangeEvent<HTMLInputElement>) => void,
  wrapperClassName?: string
}

const Input: FC<InputType> = (props) => {
  const {
    error,
    label,
    wrapperClassName,
    className,
    ...rest
  } = props;

  return (
    <LabelErrorWrapper label={label} error={error} className={wrapperClassName}>
      <AntdInput
        className={classNames(styles.inputWrapper, className)}
        {...rest}
      />
    </LabelErrorWrapper>
  );
};

export default Input;