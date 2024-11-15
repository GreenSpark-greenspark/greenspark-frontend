import airPurifier from "@/../public/img/appliances/airPurifier.png";
import kimchiRefrigerator from "@/../public/img/appliances/kimchiRefrigerator.png";
import electricFan from "@/../public/img/appliances/electricFan.png";
import topLoadingWashingMachine from "@/../public/img/appliances/topLoadingWashingMachine.png";
import microwaveOven from "@/../public/img/appliances/microwaveOven.png";
import waterPurifier from "@/../public/img/appliances/waterPurifier.png";
import dehumidifier from "@/../public/img/appliances/dehumidifier.png";
import vacuumCleaner from "@/../public/img/appliances/vacuumCleaner.png";
import television from "@/../public/img/appliances/television.png";
import frontLoadingWashingMachine from "@/../public/img/appliances/frontLoadingWashingMachine.png";
import airConditioner from "@/../public/img/appliances/airConditioner.png";
import refrigerator from "@/../public/img/appliances/refrigerator.png";

export const getImage = (type: string) => {
  switch (type) {
    case "공기청정기 (~24.12.31)":
      return airPurifier;
    case "김치냉장고":
      return kimchiRefrigerator;
    case "전기냉장고":
      return refrigerator;
    case "선풍기":
      return electricFan;
    case "전기세탁기(일반)":
      return topLoadingWashingMachine;
    case "전자레인지":
      return microwaveOven;
    case "정수기":
      return waterPurifier;
    case "제습기":
      return dehumidifier;
    case "청소기":
      return vacuumCleaner;
    case "텔레비전수상기":
      return television;
    case "전기세탁기(드럼)":
      return frontLoadingWashingMachine;
    case "전기냉난방기":
      return airConditioner;
    default:
      return frontLoadingWashingMachine;
  }
};
