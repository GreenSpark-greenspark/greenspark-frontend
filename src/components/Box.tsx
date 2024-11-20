import { ReactNode } from "react";
import style from "./Box.module.css";

interface BoxProps {
  children: ReactNode;
  minHeight?: string;
  style?: any;
}

export default function Box({ children, minHeight }: BoxProps) {
  return (
    <div className={style.CommonBox} style={{ minHeight }}>
      {children}
    </div>
  );
}
