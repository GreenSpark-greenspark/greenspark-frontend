import React from "react";
import style from "./ItemRow.module.css";
import Image from "next/image";
import InfoIcon from "@/../public/icon/toast_info_icon.svg";
interface ItemRowProps {
  label: string;
  value: string;
}

const ItemRow = ({ label, value }: ItemRowProps) => {
  return (
    <div className={style.row}>
      {label !== "" && (
        <div className={style.iconWrapper}>
          <InfoIcon />
        </div>
      )}
      <div className={style.key}>{label}</div>
      <div className={style.value}>{value}</div>
    </div>
  );
};

export default ItemRow;
