import React, { FC, useState } from "react";
import classes from "classnames";
import { Drawer as AntdDrawer } from "antd";

//components
import Button from "@/components/Button";

//helpers
import { useWindowDimension } from "@/hooks/useWindowDimension";

//assets
import LogoImg from "@/assets/icons/LogoImg";

//styles
import styles from "@/styles/components/header.module.scss"

const Header: FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { isMobile } = useWindowDimension();

  const renderNavigationList = () => (
    <ul className={styles.navList}>
      <li className={styles.navItem}><a className={styles.navLink} href="#">About</a></li>
      <li className={styles.navItem}><a className={styles.navLink} href="#">Plans</a></li>
      <li className={styles.navItem}><a className={styles.navLink} href="#"><Button type={"secondary"}>Sign Up</Button></a></li>
    </ul>
  )


  const handleModalClick = () => {
    setModalOpen(!modalOpen);
  }

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <LogoImg/>
            <p >YourCall</p>
          </div>
          <div className={classes(styles.navWrapper, { [styles.hidden]: isMobile })}>
            {renderNavigationList()}
          </div>
          <div className={classes(styles.hamburger, { [styles.hidden]: !isMobile })}>
            <div
              onClick={ () => handleModalClick() }
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
          <AntdDrawer width={"100vw"} closeIcon={null} className={styles.drawer} open={modalOpen} onClose={handleModalClick}>
            <div className={classes(styles.navWrapper, styles.drawerContent)}>
              {renderNavigationList()}
            </div>
          </AntdDrawer>
        </div>
      </div>
    </div>
  );
};

export default Header;