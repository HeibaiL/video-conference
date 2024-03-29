import React, { FC, useState } from "react";
import { Drawer as AntdDrawer } from "antd";
import classes from "classnames";

//styles
import styles from "@/styles/components/header.module.scss";


type BurgerProps = {
    isMobile: boolean;
    drawerContent: React.ReactElement;
}


const Burger: FC<BurgerProps> = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { isMobile, drawerContent } = props;

  const handleModalClick = () => {
    setModalOpen(!modalOpen);
  };

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
      <AntdDrawer open={modalOpen} width={"100vw"} closeIcon={null} className={styles.drawer} >
        <div className={classes(styles.navWrapper, styles.drawerContent)}>
          {drawerContent}
        </div>
      </AntdDrawer>
    </>
  );
};

export default Burger;