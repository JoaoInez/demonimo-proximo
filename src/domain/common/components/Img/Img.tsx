import Image from "next/image";
import styles from "./Img.module.scss";
import { ImgProps } from "./types";

const Img = ({ className, alt, ...props }: ImgProps) => (
  <div className={`${styles.container} ${className ?? ""}`}>
    <Image
      {...props}
      alt={alt}
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      quality={100}
    />
  </div>
);

export default Img;
