import Box from "@/components/Box";
import { mapApplianceDetails } from "@/utils/renderApplianceDetails";
import style from "./page.module.css";
import TopView from "@/app/_component/appliances/[id]/TopView";
import BottomView from "@/app/_component/appliances/[id]/BottomView";

export default function AppliancePage({ params }: { params: { id: string | string[] } }) {
  // 서버에서 받은 전체 응답 (api 명세서)
  const response = {
    success: true,
    code: 0,
    message: "가전제품 상세보기를 조회했습니다.",
    data: '{"response":{"header":{"resultCode":"00","resultMsg":"NORMAL_CODE"},"body":{"pageNo":"1","totalCount":"2","numOfRows":"10","items":{"item":[{"SHIP_PRARG_DD":"2017-07-01","DATA_REG_DT":"2024-10-16 15:21:58","STANDARD_CAPA":"16(kg)","APP_NO":"254170001","MODEL_TERM":"TR16SK","ENTE_TERM":"LG전자(주)","CONS_PWR":"88.9(1회)(wh)","MACH_TERM":"전기세탁기(일반)","HPRO_YN_NM":"수입","R":"9.1(WH\\/Kg)","GRADE":"2","MANUFAC_MAN_TERM":"LG전자","TEST_ORG_TERM":"한국산업기술시험원","OLDX_MODEL_TERM":"NULL"},{"SHIP_PRARG_DD":"2018-05-04","DATA_REG_DT":"2024-10-16 15:21:58","STANDARD_CAPA":"16(kg)","APP_NO":"254180049","MODEL_TERM":"TR16SKA","ENTE_TERM":"LG전자(주)","CONS_PWR":"83.6(1회)(wh)","MACH_TERM":"전기세탁기(일반)","HPRO_YN_NM":"수입","R":"8.8(WH\\/Kg)","GRADE":"2","MANUFAC_MAN_TERM":"LG전자","TEST_ORG_TERM":"한국산업기술시험원","OLDX_MODEL_TERM":"NULL"}]}}}}\n'
  };

  // JSON 문자열로 되어 있는 data 부분을 파싱
  const parsedData = JSON.parse(response.data);

  // 파싱된 data를 사용하여 필요한 정보 접근
  const items = parsedData.response.body.items.item;

  // 기자재명칭 (고유 필드 매핑을 위한 변수 저장)
  const applianceType = items[0].MACH_TERM || "Unknown";

  const transformedItem = {
    업체명칭: items[0].ENTE_TERM,
    기자재명칭: items[0].MACH_TERM,
    모델명: items[0].MODEL_TERM,
    구모델명: items[0].OLDX_MODEL_TERM,
    제조원: items[0].MANUFAC_MAN_TERM,
    효율등급: items[0].GRADE,
    ...items[0]
  };

  const applianceDetails = mapApplianceDetails(transformedItem, applianceType);

  return (
    <div className={style.BoxWrapper}>
      <Box minHeight="452px">
        <div className={style.ViewWrapper}>
          <TopView {...applianceDetails} />
          <BottomView {...applianceDetails} />
        </div>
      </Box>
    </div>
  );
}
