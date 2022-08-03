import Image, { ImageProps } from "next/image";
import styles from "./Img.module.scss";

const Img = ({
  className,
  ...props
}: Omit<
  ImageProps,
  "layout" | "objectFit" | "objectPosition" | "quality" | "width" | "height"
>) => (
  <div className={`${styles.container} ${className ?? ""}`}>
    <Image
      {...props}
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      quality={100}
    />
  </div>
);

export default Img;
