import React from "react";
import style from "./ItemRow.module.css";

interface ItemRowProps {
  label: string;
  value: string | number;
}

const ItemRow = ({ label, value }: ItemRowProps) => {
  return (
    <div className={style.row}>
      <div className={style.key}>{label}</div>
      <div className={style.value}>{value}</div>
    </div>
  );
};

export default ItemRow;
