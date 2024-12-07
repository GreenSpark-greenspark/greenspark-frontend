import style from "./BottomView.module.css";
import ItemRow from "./ItemRow";
import { useState } from "react";

interface BottomViewProps {
  [key: string]: any;
}

const BottomView = ({ ...applianceDetails }: BottomViewProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const excludedKeys = ["업체명칭", "기자재명칭", "모델명", "효율등급"];
  const entries = Object.entries(applianceDetails)
    .filter(([key]) => !excludedKeys.includes(key))
    .filter(([key, value]) => value !== null && value !== "NULL");

  const handleIconClick = (key: string) => {
    setSelectedKey(selectedKey === key ? null : key);
  };

  return (
    <div className={style.container}>
      {entries.map(([key, value], index) => (
        <div key={key + index}>
          <ItemRow
            label={key}
            value={value}
            isSelected={selectedKey === key}
            onIconClick={() => handleIconClick(key)}
          />
          {index !== entries.length - 1 && (
            <ItemRow key={key + "empty" + index} label={""} value={""} />
          )}
        </div>
      ))}
    </div>
  );
};

export default BottomView;
