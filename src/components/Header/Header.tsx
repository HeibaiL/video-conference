import { FC } from "react";
import classes from "classnames";
import Link from "next/link"

//components
import Button from "@/components/Button";
import Burger from "@/components/Header/components/Burger";

//helpers
import { useWindowDimension } from "@/hooks/useWindowDimension";

//assets
import LogoImg from "@/assets/icons/LogoImg";

//styles
import styles from "@/styles/components/header.module.scss"

const NAVIGATION_LIST = [
  { title: "About", url: "#", className: "styles.navItem" },
  { title: "Plans", url: "#", className: "styles.navItem" },
  { title: "Sign Up", url: "#", className: "styles.navItem", hasButton: true },
]


const Header: FC = () => {
  const { isMobile } = useWindowDimension();

  const renderNavigationList = () => (
    <ul className={styles.navList}>
      {NAVIGATION_LIST.map(el => (
        <li key={el.title} className={styles.navItem}>
          <Link className={el.className} href={el.url}>
            {el.hasButton ? <Button type="secondary">{el.title}</Button>
              : el.title
            }
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <LogoImg/>
            <p>YourCall</p>
          </div>
          <div className={classes(styles.navWrapper, { [styles.hidden]: isMobile })}>
            {renderNavigationList()}
          </div>
          <Burger isMobile={isMobile} drawerContent={renderNavigationList()}/>
        </div>
      </div>
    </div>
  );
};

export default Header;