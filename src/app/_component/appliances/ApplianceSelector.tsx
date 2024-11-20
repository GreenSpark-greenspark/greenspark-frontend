import { useState } from "react";
import styles from "./ClientComponent.module.css";

interface ApplianceSelectorProps {
  selectedAppliance: string;
  setSelectedAppliance: (appliance: string) => void;
  filteredOptions: string[];
}

export default function ApplianceSelector({
  selectedAppliance,
  setSelectedAppliance,
  filteredOptions
}: ApplianceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={styles.dropdownButton} onClick={() => setIsOpen(!isOpen)}>
        {selectedAppliance || "기자재 명칭"}
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {filteredOptions.map(option => (
            <div
              key={option}
              onClick={() => {
                setSelectedAppliance(option);
                setIsOpen(false);
              }}
              className={`${styles.dropdownOption} ${
                selectedAppliance === option ? styles.dropdownOptionSelected : ""
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
