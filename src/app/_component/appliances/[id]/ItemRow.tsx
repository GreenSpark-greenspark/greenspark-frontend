import React from "react";
import style from "./ItemRow.module.css";

interface ItemRowProps {
  label: string;
  value: string | number;
}

const ItemRow = ({ label, value }: ItemRowProps) => {
  // 문자열일 경우 첫 번째 숫자만 추출
  const numericValue = typeof value === "string" ? value.match(/^\d+(\.\d+)?/)?.[0] : value;

  return (
    <div className={style.row}>
      <div className={style.key}>{label}</div>
      <div className={style.separator}></div>
      <div className={style.value}>{numericValue}</div>
    </div>
  );
};

export default ItemRow;
