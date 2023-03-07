import { FC } from "react"
import { Button as AntdButton } from "antd";
import classNames from "classnames";

//styles
import styles from "@/styles/components/button.module.scss"

type ButtonProps = {
  children: string;
  className?: string;
  onSubmit?: () => void;
  type: "primary" | "secondary"
}

const Button: FC<ButtonProps> = (props) => {
  const { children, className, onSubmit, type } = props;

  const classes = classNames(styles.button, styles[type], className);

  return (
    <AntdButton className={classes} onClick={onSubmit}>
      {children}
    </AntdButton>
  )
}


export default Button;
