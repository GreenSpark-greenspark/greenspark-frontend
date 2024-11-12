export interface ApplianceData {
  업체명칭: string;
  기자재명칭: string;
  모델명: string;
  구모델명: string | null;
  제조원: string;
  효율등급: string;
  [key: string]: any;
}

export function mapApplianceDetails(appliance: ApplianceData, applianceType: string) {
  // 공통 필드
  const commonFields = {
    업체명칭: appliance.업체명칭,
    기자재명칭: appliance.기자재명칭,
    모델명: appliance.모델명,
    구모델명: appliance.구모델명,
    제조원: appliance.제조원,
    효율등급: appliance.효율등급
  };

  // 고유 필드 매핑
  let uniqueFields = {};
  switch (applianceType) {
    case "전기세탁기(일반)":
      uniqueFields = {
        표준세탁용량: appliance.STANDARD_CAPA,
        세탁시소비전력량: appliance.CONS_PWR,
        소비효율등급지표: appliance.R
      };
      break;
    // 다른 케이스들 추가...
    default:
      break;
  }

  // 공통 + 고유 필드
  return { ...commonFields, ...uniqueFields };
}
