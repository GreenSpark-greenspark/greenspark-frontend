"use client";

import { useState } from "react";
import axios from "axios";
import Box from "@/components/Box";
import styles from "./ClientComponent.module.css";
import Toast from "@/components/Toast";
import Popup from "../../_component/appliances/Popup";
import ApplianceSelector from "../../_component/appliances/ApplianceSelector";
import ModelInput from "../../_component/appliances/ModelInput";
import ApplianceList from "../../_component/appliances/ApplianceList";
import AddButton from "../../_component/appliances/AddButton";
import LoadingDots from "@/components/LoadingDots";
import { getDisplayName } from "@/utils/getDisplayName";

interface ApplianceItem {
  id: number;
  모델명: string;
  업체명: string;
  기자재명칭: string;
  효율등급: string;
}

const applianceOptions = [
  "전기세탁기(일반)",
  "전기진공청소기",
  "전기세탁기(드럼)",
  "공기청정기",
  "김치냉장고",
  "전기냉온수기",
  "텔레비전수상기",
  "제습기",
  "전기냉장고",
  "전기냉난방기"
];

const userId = 1;

export default function ClientComponent() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppliance, setSelectedAppliance] = useState("");
  const [modelName, setModelName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchResults, setSearchResults] = useState<ApplianceItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedModelName, setSelectedModelName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const transformedOptions = applianceOptions.map(option => ({
    original: option,
    display: getDisplayName(option)
  }));

  const filteredOptions = transformedOptions.filter(option =>
    option.display.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSearch = async () => {
    if (!selectedAppliance) {
      showToastMessage("먼저 기자재 명칭을 선택해주세요!");
      return;
    }

    if (!modelName) {
      showToastMessage("제품 모델명을 입력해주세요!");
      return;
    }

    const originalApplianceName = transformedOptions.find(
      option => option.display === selectedAppliance
    )?.original;

    const apiApplianceName =
      originalApplianceName === "공기청정기" ? "공기청정기 (~24.12.31)" : originalApplianceName;

    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/appliances/search`, {
        params: {
          modelName,
          equipmentName: apiApplianceName
        }
      });

      if (response.data.success) {
        const parsedData = JSON.parse(response.data.data);

        if (parsedData?.response?.body?.items?.item?.length > 0) {
          const items = parsedData.response.body.items.item;

          const transformedItems = items.map((item: any, index: number) => ({
            id: index,
            모델명: item.MODEL_TERM,
            업체명: item.ENTE_TERM,
            기자재명칭: item.MACH_TERM,
            효율등급: item.GRADE
          }));

          setSearchResults(transformedItems);
        } else {
          showToastMessage("검색 결과가 없습니다.");
          setSearchResults([]);
        }
      } else {
        showToastMessage("검색에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      showToastMessage("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    if (selectedIndex !== null) {
      const selectedModel = searchResults[selectedIndex];

      const originalApplianceName = transformedOptions.find(
        option => option.display === selectedAppliance
      )?.original;

      const apiApplianceName =
        originalApplianceName === "공기청정기" ? "공기청정기 (~24.12.31)" : originalApplianceName;

      try {
        const response = await axios.post(`${API_URL}/appliances/${userId}`, {
          modelTerm: selectedModel.모델명,
          grade: selectedModel.효율등급,
          matchTerm: apiApplianceName,
          manufacturer: selectedModel.업체명
        });

        if (response.status === 200 && response.data.success) {
          if (response.data.message === "이미 존재하는 가전제품입니다.") {
            showToastMessage("이미 추가된 가전제품입니다!");
          } else {
            showToastMessage("가전제품이 성공적으로 추가되었습니다.");
            setSelectedModelName(selectedModel.모델명);
            setShowPopup(true);
            setSelectedIndex(null);
          }
        } else {
          showToastMessage("추가에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("추가 요청 중 오류 발생:", error);
        showToastMessage("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.boxContainer}>
      <Box minHeight="330px">
        <div className={styles.container}>
          <ApplianceSelector
            selectedAppliance={selectedAppliance}
            setSelectedAppliance={setSelectedAppliance}
            filteredOptions={filteredOptions.map(option => option.display)}
          />
          <ModelInput
            modelName={modelName}
            setModelName={setModelName}
            handleSearch={handleSearch}
            isApplianceSelected={!!selectedAppliance}
            showToastMessage={showToastMessage}
          />
        </div>
        {isLoading ? (
          <div
            style={{
              height: "330px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <LoadingDots />
          </div>
        ) : (
          <ApplianceList
            applianceMockData={searchResults}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        )}
        {showToast && <Toast message={toastMessage} />}
        <AddButton handleAdd={handleAdd} selectedIndex={selectedIndex} />
      </Box>
      {showPopup && (
        <Popup
          applianceType={
            transformedOptions.find(option => option.display === selectedAppliance)?.original || ""
          }
          modelName={selectedModelName}
          onClose={closePopup}
        />
      )}
    </div>
  );
}
