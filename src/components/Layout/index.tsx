import { ReactElement } from "react";
import styles from "./Layout.module.scss";

interface IProps {
  children: ReactElement;
}

const Layout = ({ children }: IProps) => (
  <main className={styles.main}>{children}</main>
);

export default Layout;
