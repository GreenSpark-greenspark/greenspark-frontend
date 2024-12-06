import airPurifier from "@/../public/img/appliances/airPurifier.png";
import kimchiRefrigerator from "@/../public/img/appliances/kimchiRefrigerator.png";
import topLoadingWashingMachine from "@/../public/img/appliances/topLoadingWashingMachine.png";
import waterPurifier from "@/../public/img/appliances/waterPurifier.png";
import dehumidifier from "@/../public/img/appliances/dehumidifier.png";
import vacuumCleaner from "@/../public/img/appliances/vacuumCleaner.png";
import television from "@/../public/img/appliances/television.png";
import frontLoadingWashingMachine from "@/../public/img/appliances/frontLoadingWashingMachine.png";
import airConditioner from "@/../public/img/appliances/airConditioner.png";
import refrigerator from "@/../public/img/appliances/refrigerator.png";
import logo from "@/../public/img/book_logo.png";
import lion from "@/../public/img/likelionssu.png";

export const getImage = (type: string) => {
  switch (type) {
    case "공기청정기 (~24.12.31)":
      return airPurifier;
    case "공기청정기":
      return airPurifier;
    case "김치냉장고":
      return kimchiRefrigerator;
    case "전기냉장고":
      return refrigerator;
    case "전기세탁기(일반)":
      return topLoadingWashingMachine;
    case "전기냉온수기":
      return waterPurifier;
    case "제습기":
      return dehumidifier;
    case "전기진공청소기":
      return vacuumCleaner;
    case "텔레비전수상기":
      return television;
    case "전기세탁기(드럼)":
      return frontLoadingWashingMachine;
    case "전기냉난방기":
      return airConditioner;
    case "전기냉난방기(~2018.10.01 이전)":
      return airConditioner;
    // 백과 이미지
    case "세탁기":
      return topLoadingWashingMachine;
    case "진공 청소기":
      return vacuumCleaner;
    case "드럼세탁기":
      return frontLoadingWashingMachine;
    case "정수기":
      return waterPurifier;
    case "TV/모니터":
      return television;
    case "냉장고":
      return refrigerator;
    case "에어컨":
      return airConditioner;
    case "기타":
      return logo;
    case "회고":
      return lion;
    default:
      return logo;
  }
};
