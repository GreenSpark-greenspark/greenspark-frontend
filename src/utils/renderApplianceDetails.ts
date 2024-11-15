export interface ApplianceData {
  업체명칭: string;
  기자재명칭: string;
  모델명: string;
  구모델명: string;
  제조원: string;
  효율등급: string;
  [key: string]: any;
}

export function mapApplianceDetails(appliance: ApplianceData, applianceType: string) {
  const commonFields = {
    업체명칭: appliance.업체명칭,
    기자재명칭: appliance.기자재명칭,
    모델명: appliance.모델명,
    구모델명: appliance.구모델명,
    제조원: appliance.제조원,
    효율등급: appliance.효율등급
  };

  let uniqueFields = {};
  switch (applianceType) {
    case "전기세탁기(일반)":
      uniqueFields = {
        표준세탁용량: appliance.STANDARD_CAPA,
        세탁시소비전력량: appliance.CONS_PWR,
        소비효율등급지표: appliance.R
      };
      break;

    case "전기진공청소기":
      uniqueFields = {
        측정소비전력: appliance.MEAS_CONS_PWR,
        최대흡입일률: appliance.MAX_CAPA
      };
      break;

    case "전기세탁기(드럼)":
      uniqueFields = {
        네트워크기능: appliance.CLASS_CODE,
        표준세탁용량: appliance.STANDARD_CAPA,
        세탁시소비전력량: appliance.CONS_PWR,
        소비효율등급지표: appliance.R
      };
      break;

    case "선풍기":
      uniqueFields = {
        선풍기날개지름: appliance.FAN_DIAMETER,
        풍량효율: appliance.EFFIC,
        최저소비효율기준: appliance.CONS_EFFIC
      };
      break;

    case "공기청정기 (~24.12.31)":
      uniqueFields = {
        표준사용면적: appliance.STANDARD_CONS_AREA,
        탈취효율: appliance.DEODORIZATION_EFFIC,
        대기전력: appliance.WAIT_PWR,
        소비전력: appliance.CONS_PWR
      };
      break;

    case "김치냉장고":
      uniqueFields = {
        김치저장실유효내용적: appliance.KIMCHI_AVAIL_CAPA,
        월산_소비전력량: appliance.MONTH_CONS_PWR,
        소비자효율등급지표: appliance.R
      };
      break;

    case "전기냉온수기":
      uniqueFields = {
        월간소비전력량: appliance.MONTH_CONS_PWR,
        냉수저장탱크용량: appliance.COLD_WATER_CAPA,
        온수저장탱크용량: appliance.WARM_CAPA,
        소비효율등급부여지표: appliance.R
      };
      break;

    case "텔레비전수상기":
      uniqueFields = {
        화면대각선길이: appliance.DIAGO_LENGTH,
        디스플레이방식: appliance.DISPLAY,
        소비전력: appliance.R
      };
      break;

    case "제습기":
      uniqueFields = {
        제습효율: appliance.DHF_EFFIC,
        정격제습능력: appliance.RATE_DHF_ABTY,
        월간에너지비용: appliance.YEAR_COST
      };
      break;

    case "전기냉장고":
      uniqueFields = {
        월간소비전력량: appliance.MONTH_CONS_PWR,
        용량: appliance.CAPA
      };
      break;

    case "전기냉난방기":
      uniqueFields = {
        정격냉방능력: appliance.PROP_COOL_PWR,
        정격난방능력: appliance.PROP_HEAT_PWR,
        연간소비전력량: appliance.YEAR_CONS_PWR,
        냉방기간에너지소비효율: appliance.COOL_EFFIC,
        시간당소비전력량: appliance.HOUR_CONS_PWR,
        월간에너지비용: appliance.MON_COST
      };
      break;
    case "전기냉난방기 (~2018.10.01 이전)":
      uniqueFields = {
        정격냉방능력: appliance.PROP_COOL_PWR,
        정격난방능력: appliance.PROP_HEAT_PWR,
        연간소비전력량: appliance.YEAR_CONS_PWR,
        냉방기간에너지소비효율: appliance.COOL_EFFIC,
        시간당소비전력량: appliance.HOUR_CONS_PWR,
        월간에너지비용: appliance.MON_COST
      };
      break;

    default:
      break;
  }

  return { ...commonFields, ...uniqueFields };
}
