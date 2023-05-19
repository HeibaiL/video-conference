import { FC, useState, ChangeEvent } from "react";
import { Modal } from "antd";

//components
import Input from "@/components/Input/Input";

//styles
import styles from "@/styles/pages/conference.module.scss";


type UserNameModalType = {
    onSuccess: (_data:string) => void,
    open: boolean,
}

const UserNameModal:FC<UserNameModalType> = ({ onSuccess, ...props }) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onOk = () => {
    if (!name) {
      setError("Please, enter valid name");
      
      return;
    }

    onSuccess(name);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (error) {
      setError(null);
    }
    setName(e.target.value);
  };

  return (
    <Modal
      onOk={onOk}
      onCancel={() => null}
      closable={false}
      className={styles.userNameModal}
      title="Please, enter your name"
      {...props}
    >
      <Input error={error} onChange={handleChange}/>
    </Modal>
  );
};


export default UserNameModal;