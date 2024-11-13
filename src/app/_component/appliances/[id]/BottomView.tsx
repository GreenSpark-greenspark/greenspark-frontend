import style from "./BottomView.module.css";
import ItemRow from "./ItemRow";

interface BottomViewProps {
  [key: string]: any;
}

const BottomView = ({ ...applianceDetails }: BottomViewProps) => {
  const excludedKeys = ["업체명칭", "기자재명칭", "모델명", "효율등급"];

  return (
    <div className={style.container}>
      {Object.entries(applianceDetails)
        .filter(([key]) => !excludedKeys.includes(key)) 
        .map(
          ([key, value]) =>
            value !== null && value !== "NULL" && <ItemRow key={key} label={key} value={value} />
        )}
    </div>
  );
};

export default BottomView;
