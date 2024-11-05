import styles from "./ClientComponent.module.css";

interface AddButtonProps {
  handleAdd: () => void;
  selectedIndex: number | null;
}

export default function AddButton({ handleAdd, selectedIndex }: AddButtonProps) {
  return (
    <div className={styles.buttonWrapper}>
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
