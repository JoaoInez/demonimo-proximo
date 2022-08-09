import { ImageProps } from "next/image";

export type ImgProps = Omit<
  ImageProps,
  "layout" | "objectFit" | "objectPosition" | "quality" | "width" | "height"
>;
