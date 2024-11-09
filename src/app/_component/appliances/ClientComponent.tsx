"use client";

import { useState } from "react";
import Box from "@/components/Box";
import styles from "./ClientComponent.module.css";
import Toast from "@/components/Toast";
import Popup from "../../_component/appliances/Popup";
import ApplianceSelector from "../../_component/appliances/ApplianceSelector";
import ModelInput from "../../_component/appliances/ModelInput";
import ApplianceList from "../../_component/appliances/ApplianceList";
import AddButton from "../../_component/appliances/AddButton";

const applianceOptions = [
  "전기세탁기(일반)",
  "전기진공청소기",
  "전기세탁기(드럼)",
  "선풍기",
  "공기청정기",
  "전기밥솥",
  "김치냉장고",
  "전기온풍기",
  "전기스토브",
  "전기냉온수기",
  "텔레비전",
  "제습기",
  "전기냉장고",
  "전기레인지",
  "셋톱박스",
  "전기냉방기",
  "전기냉난방기"
];

const applianceMockData = [
  { id: 1, 모델명: "TR16SK", 업체명: "LG전자", 기자재명칭: "전기세탁기(일반)", 효율등급: "2" },
  { id: 2, 모델명: "DOH222DF1", 업체명: "위니아전자", 기자재명칭: "냉장고", 효율등급: "1" }
];

export default function ClientComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppliance, setSelectedAppliance] = useState("");
  const [modelName, setModelName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedModelName, setSelectedModelName] = useState<string>("");

  const filteredOptions = applianceOptions.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    if (!selectedAppliance && !modelName) {
      setToastMessage("기자재 명칭과 모델명을 알려주세요!");
    } else if (!selectedAppliance) {
      setToastMessage("기자재 명칭을 선택해주세요!");
    } else if (!modelName) {
      setToastMessage("제품 모델명을 입력해주세요!");
    } else {
      console.log("기자재 명칭:", selectedAppliance);
      console.log("제품 모델명:", modelName);
      return;
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAdd = () => {
    if (selectedIndex !== null) {
      const selectedModel = applianceMockData[selectedIndex];
      setSelectedModelName(selectedModel.모델명);
      setShowPopup(true);
      setSelectedIndex(null);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.boxContainer}>
      <Box minHeight="300px">
        <div className={styles.container}>
          <ApplianceSelector
            selectedAppliance={selectedAppliance}
            setSelectedAppliance={setSelectedAppliance}
            filteredOptions={filteredOptions}
          />
          <ModelInput
            modelName={modelName}
            setModelName={setModelName}
            handleSearch={handleSearch}
          />
        </div>
        <ApplianceList
          applianceMockData={applianceMockData}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        {showToast && <Toast message={toastMessage} />}
        <AddButton handleAdd={handleAdd} selectedIndex={selectedIndex} />
      </Box>

      {showPopup && <Popup modelName={selectedModelName} onClose={closePopup} />}
    </div>
  );
}
