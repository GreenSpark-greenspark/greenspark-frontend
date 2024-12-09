import React from "react";
import style from "./ItemRow.module.css";
import InfoIcon from "@/../public/icon/info_icon.svg";
import InfoFillIcon from "@/../public/icon/info_fill_icon.svg";
import { tooltips } from "@/mock/toolTip"; // tooltips import 추가

interface ItemRowProps {
  label: string;
  value: string;
  isSelected?: boolean;
  onIconClick?: () => void;
}

const ItemRow = ({ label, value, isSelected, onIconClick }: ItemRowProps) => {
  // 툴팁이 존재하는지 체크
  const hasTooltip = tooltips[label];

  // 툴팁이 없으면 아이콘을 숨김
  const iconVisibilityStyle: React.CSSProperties = {
    visibility: hasTooltip ? "visible" : "hidden"
  };

  return (
    <div className={style.row}>
      {label !== "" && (
        <div className={style.iconWrapper} onClick={onIconClick} style={iconVisibilityStyle}>
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
