import styles from "./ClientComponent.module.css";
import SearchIcon from "@/../public/icon/search_icon.svg";

interface ModelInputProps {
  modelName: string;
  setModelName: (modelName: string) => void;
  handleSearch: () => void;
}

export default function ModelInput({ modelName, setModelName, handleSearch }: ModelInputProps) {
  return (
    <div className={styles.inputGroup}>
      <input
        type="text"
        placeholder="제품 모델명 검색"
        value={modelName}
        onChange={e => setModelName(e.target.value)}
        className={styles.modelInput}
      />
      <button onClick={handleSearch} className={styles.searchBtn}>
        <SearchIcon style={{ width: "20px", height: "20px" }} />
      </button>
    </div>
  );
}
