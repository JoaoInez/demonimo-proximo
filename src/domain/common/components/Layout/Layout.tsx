import styles from "./Layout.module.scss";
import { LayoutProps } from "./types";

const Layout = ({ children }: LayoutProps) => (
  <main className={styles.main}>{children}</main>
);

export default Layout;
