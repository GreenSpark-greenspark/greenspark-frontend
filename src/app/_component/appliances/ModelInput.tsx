import styles from "./ClientComponent.module.css";
import SearchIcon from "@/../public/icon/search_icon.svg";

interface ModelInputProps {
  modelName: string;
  setModelName: (modelName: string) => void;
  handleSearch: () => void;
  isApplianceSelected: boolean;
  showToastMessage: (message: string) => void;
}

export default function ModelInput({
  modelName,
  setModelName,
  handleSearch,
  isApplianceSelected,
  showToastMessage
}: ModelInputProps) {
  const handleOverlayClick = () => {
    if (!isApplianceSelected) {
      showToastMessage("먼저 기자재 명칭을 선택해주세요!");
    }
  };

  return (
    <div className={styles.inputGroup} style={{ position: "relative" }}>
      {!isApplianceSelected && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            zIndex: 1,
            cursor: "not-allowed"
          }}
        ></div>
      )}
      <input
        type="text"
        placeholder="제품 모델명 검색"
        value={modelName}
        onChange={e => setModelName(e.target.value)}
        className={styles.modelInput}
      />
      <button
        onClick={() => {
          if (isApplianceSelected) {
            handleSearch();
          } else {
            showToastMessage("먼저 기자재 명칭을 선택해주세요!");
          }
        }}
        className={styles.searchBtn}
      >
        <SearchIcon style={{ width: "20px", height: "20px" }} />
      </button>
    </div>
  );
}
