import styles from "./ClientComponent.module.css";
import ToolTip from "./ToolTip";

interface AddButtonProps {
  handleAdd: () => void;
  selectedIndex: number | null;
}

export default function AddButton({ handleAdd, selectedIndex }: AddButtonProps) {
  return (
    <div className={styles.buttonWrapper}>
      <ToolTip/>
      <button
        onClick={handleAdd}
        className={`${styles.addButton} ${selectedIndex !== null ? styles.activeButton : ""}`}
        disabled={selectedIndex === null}
      >
        추가하기
      </button>
    </div>
  );
}
