import { FC } from "react"
import { Button as AntdButton } from "antd";
import classNames from "classnames";

//styles
import styles from "@/styles/components/button.module.scss"

type ButtonProps = {
  children: string;
  className?: string;
  onClick?: () => void;
  type: "primary" | "secondary"
}

const Button: FC<ButtonProps> = (props) => {
  const { children, className, onClick, type } = props;

  const classes = classNames(styles.button, styles[type], className);

  return (
    <AntdButton className={classes} onClick={onClick}>
      {children}
    </AntdButton>
  )
}


export default Button;
