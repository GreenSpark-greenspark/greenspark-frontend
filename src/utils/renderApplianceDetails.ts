interface ApplianceData {
  업체명칭: string;
  기자재명칭: string;
  모델명: string;
  구모델명: string | null;
  제조원: string;
  효율등급: string;
  [key: string]: any;
}

// 고유 필드 동적 처리 함수
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
    case "전기진공청소기":
      uniqueFields = {
        측정소비전력: appliance.MEAS_CONS_PWR,
        최대흡입일률: appliance.MAX_CAPA
      };
      break;
    case "전기세탁기(드럼)":
      uniqueFields = {
        네트워크기능: appliance.NETWORK_FUNC,
        표준세탁용량: appliance.STANDARD_CAPA,
        세탁시소비전력량: appliance.CONS_PWR,
        소비효율등급지표: appliance.R
      };
      break;
    case "선풍기":
      uniqueFields = {
        선풍기날개지름: appliance.FAN_BLADE_DIAMETER,
        풍량효율: appliance.AIRFLOW_EFFIC,
        최저소비효율기준: appliance.MIN_EFFIC
      };
      break;
    case "공기청정기":
      uniqueFields = {
        표준사용면적: appliance.STANDARD_CONS_AREA,
        탈취효율: appliance.DEODORIZATION_EFFIC,
        대기전력: appliance.WAIT_PWR,
        소비전력: appliance.CONS_PWR
      };
      break;
    case "전기밥솥":
      uniqueFields = {
        정격소비전력: appliance.RATED_PWR,
        최대가용인원: appliance.MAX_CAPACITY,
        대기전력: appliance.WAIT_PWR
      };
      break;
    case "김치냉장고":
      uniqueFields = {
        김치저장실유효내용적: appliance.KIMCHI_CAPA,
        월산소비전력량: appliance.MONTHLY_CONS_PWR,
        소비자효율등급지표: appliance.CONSUMER_EFFIC_INDEX
      };
      break;
    case "전기온풍기":
      uniqueFields = {
        정격소비전력: appliance.RATED_PWR,
        소비전력: appliance.CONS_PWR,
        월간에너지비용: appliance.MONTHLY_ENERGY_COST,
        난방효율: appliance.HEATING_EFFIC
      };
      break;
    case "전기스토브":
      uniqueFields = {
        정격소비전력: appliance.RATED_PWR,
        소비전력: appliance.CONS_PWR,
        월간에너지비용: appliance.MONTHLY_ENERGY_COST,
        대기전력: appliance.WAIT_PWR
      };
      break;
    case "전기냉온수기":
      uniqueFields = {
        월간소비전력량: appliance.MONTHLY_CONS_PWR,
        냉수저장탱크용량: appliance.COLD_TANK_CAPA,
        온수저장탱크용량: appliance.HOT_TANK_CAPA,
        소비효율등급부여지표: appliance.EFFIC_INDICATOR
      };
      break;
    case "텔레비전수상기":
      uniqueFields = {
        화면대각선길이: appliance.SCREEN_DIAGONAL,
        디스플레이방식: appliance.DISPLAY_TYPE,
        소비전력: appliance.CONS_PWR
      };
      break;
    case "제습기":
      uniqueFields = {
        제습효율: appliance.DEHUMIDIFY_EFFIC,
        정격제습능력: appliance.RATED_DEHUMIDIFY_CAPA,
        월간에너지비용: appliance.MONTHLY_ENERGY_COST
      };
      break;
    case "전기냉장고":
      uniqueFields = {
        월간소비전력량: appliance.MONTHLY_CONS_PWR,
        용량: appliance.CAPACITY
      };
      break;
    case "전기레인지":
      uniqueFields = {
        효율기준: appliance.EFFIC_STANDARD,
        분류: appliance.CATEGORY,
        단위소비전력량: appliance.UNIT_CONS_PWR,
        연간에너지비용: appliance.ANNUAL_ENERGY_COST,
        연간소비전력량: appliance.ANNUAL_CONS_PWR
      };
      break;
    case "셋톱박스":
      uniqueFields = {
        효율기준: appliance.EFFIC_STANDARD,
        능동대기모드소비전력: appliance.ACTIVE_PWR,
        수동대기모드소비전력: appliance.PASSIVE_PWR
      };
      break;
    case "전기냉방기":
      uniqueFields = {
        냉방기간월간소비전력량: appliance.MONTHLY_CONS_PWR,
        냉방기간에너지소비효율량: appliance.COOLING_EFFIC
      };
      break;
    case "전기냉난방기":
      uniqueFields = {
        정격냉방능력: appliance.RATED_COOLING_CAPA,
        정격난방능력: appliance.RATED_HEATING_CAPA,
        연간소비전력량: appliance.ANNUAL_CONS_PWR,
        냉방기간에너지소비효율: appliance.COOLING_EFFIC
      };
      break;

    default:
      break;
  }

  // 공통 + 고유 필드
  return { ...commonFields, ...uniqueFields };
}
