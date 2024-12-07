import React from "react";
import style from "./ItemRow.module.css";
import InfoIcon from "@/../public/icon/info_icon.svg";
import InfoFillIcon from "@/../public/icon/info_fill_icon.svg";

interface ItemRowProps {
  label: string;
  value: string;
  isSelected?: boolean;
  onIconClick?: () => void;
}

const ItemRow = ({ label, value, isSelected, onIconClick }: ItemRowProps) => {
  return (
    <div className={style.row}>
      {label !== "" && (
        <div className={style.iconWrapper} onClick={onIconClick}>
          {isSelected ? <InfoFillIcon /> : <InfoIcon />}
        </div>
      )}
      {label === "" && <div className={style.emptyDiv} />}
      <div className={style.key}>{label}</div>
      <div className={style.value}>{value}</div>
    </div>
  );
};

export default ItemRow;
