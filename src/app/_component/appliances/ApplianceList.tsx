import styles from "./ClientComponent.module.css";
import CheckIcon from "@/../public/icon/check_icon.svg";
import Appliance from "@/app/_component/appliances/Appliance";
import { getColorFromGrade } from "@/utils/getColorfromGrade";

interface ApplianceItem {
  id: number;
  모델명: string;
  업체명: string;
  기자재명칭: string;
  효율등급: string;
  [key: string]: any;
}

interface ApplianceListProps {
  applianceMockData: ApplianceItem[];
  selectedIndex: number | null;
  setSelectedIndex: (index: number) => void;
}

export default function ApplianceList({
  applianceMockData,
  selectedIndex,
  setSelectedIndex
}: ApplianceListProps) {
  return (
    <div className={styles.applianceList}>
      {applianceMockData.map((item, index) => (
        <div
          key={item.id || index}
          className={`${styles.applianceCard} ${
            selectedIndex === index ? styles.selectedCard : ""
          }`}
          onClick={() => setSelectedIndex(index)}
        >
          <div className={styles.checkedIcon}>
            {selectedIndex === index ? <CheckIcon fill="#fff" /> : <CheckIcon fill="#888" />}
          </div>
          <Appliance
            id={item.id}
            grade={item.효율등급}
            type={item.기자재명칭}
            width={6.5}
            alt={`${item.기자재명칭} 이미지`}
          />
          <div className={styles.RightContainer}>
            <div className={styles.TextWrapper}>
              <div className={styles.TextContainer}>
                <span className={styles.TextBold}>모델명</span>
                <span className={styles.TextRegular}>{item.모델명}</span>
              </div>
              <div className={styles.TextContainer}>
                <span className={styles.TextBold}>업체명</span>
                <span className={styles.TextRegular}>{item.업체명}</span>
              </div>
            </div>
            <div className={styles.BtnContainer}>
              <div className={styles.GrayBtn}>{item.기자재명칭}</div>
              <div
                className={styles.ColorBtn}
                style={{ backgroundColor: getColorFromGrade(item.효율등급) }}
              >
                {item.효율등급}등급
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
