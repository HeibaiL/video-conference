import React, { FC, useState } from "react";
import classes from "classnames";

//components
import Drawer from "@/components/Header/components/Drawer";

//styles
import styles from "@/styles/components/header.module.scss";

type BurgerProps = {
    isMobile:boolean;
  drawerContent: React.ReactElement;
}


const Burger: FC<BurgerProps> = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { isMobile, drawerContent } = props;

  const handleModalClick = () => {
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <div className={classes(styles.hamburger, { [styles.hidden]: !isMobile })}>
        <div
          onClick={handleModalClick}
          className={classes({ [styles.open]: modalOpen })}
          id={styles.menuToggle}
        >
          <div id={styles.hamburgerBtn}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div id={styles.cross}>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <Drawer modalOpen={modalOpen} drawerContent={drawerContent}></Drawer>
    </>
  );
};

export default Burger;