import React, { FC } from "react";
import classes from "classnames";
import { Drawer as AntdDrawer } from "antd";

//styles
import styles from "@/styles/components/header.module.scss";

type DrawerProps = {
    modalOpen: boolean;
    drawerContent: React.ReactElement;
}


const Drawer:FC<DrawerProps> = (props) => {
  const { modalOpen, drawerContent } = props;

  return (
    <AntdDrawer width={"100vw"} closeIcon={null} className={styles.drawer} open={modalOpen}
    >
      <div className={classes(styles.navWrapper, styles.drawerContent)}>
        {drawerContent}
      </div>
    </AntdDrawer>
  );
};

export default Drawer;