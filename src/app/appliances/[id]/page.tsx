// const data = `{
//   "success": true,
//   "code": 0,
//   "message": "가전제품 상세보기를 조회했습니다.",
//   "data": "{\"response\":{\"header\":{\"resultCode\":\"00\",\"resultMsg\":\"NORMAL_CODE\"},\"body\":{\"pageNo\":\"1\",\"totalCount\":\"2\",\"numOfRows\":\"10\",\"items\":{\"item\":[{\"SHIP_PRARG_DD\":\"2017-07-01\",\"DATA_REG_DT\":\"2024-10-16 15:21:58\",\"STANDARD_CAPA\":\"16(kg)\",\"APP_NO\":\"254170001\",\"MODEL_TERM\":\"TR16SK\",\"ENTE_TERM\":\"LG전자(주)\",\"CONS_PWR\":\"88.9(1회)(wh)\",\"MACH_TERM\":\"전기세탁기(일반)\",\"HPRO_YN_NM\":\"수입\",\"R\":\"9.1(WH\\/Kg)\",\"GRADE\":\"2\",\"MANUFAC_MAN_TERM\":\"LG전자\",\"TEST_ORG_TERM\":\"한국산업기술시험원\",\"OLDX_MODEL_TERM\":\"NULL\"},{\"SHIP_PRARG_DD\":\"2018-05-04\",\"DATA_REG_DT\":\"2024-10-16 15:21:58\",\"STANDARD_CAPA\":\"16(kg)\",\"APP_NO\":\"254180049\",\"MODEL_TERM\":\"TR16SKA\",\"ENTE_TERM\":\"LG전자(주)\",\"CONS_PWR\":\"83.6(1회)(wh)\",\"MACH_TERM\":\"전기세탁기(일반)\",\"HPRO_YN_NM\":\"수입\",\"R\":\"8.8(WH\\/Kg)\",\"GRADE\":\"2\",\"MANUFAC_MAN_TERM\":\"LG전자\",\"TEST_ORG_TERM\":\"한국산업기술시험원\",\"OLDX_MODEL_TERM\":\"NULL\"}]}}}}\n"
// }`;

export default function page({ params }: { params: { id: string | string[] } }) {
  return <div>{params.id}</div>;
}
