export type ApplianceType = "에어컨" | "냉장고" | "전기세탁기";

export const data: { id: number; grade: number; type: ApplianceType }[] = [
  { id: 1, grade: 1, type: "에어컨" },
  { id: 2, grade: 3, type: "냉장고" },
  { id: 3, grade: 3, type: "전기세탁기" },
  { id: 4, grade: 4, type: "에어컨" },
  { id: 5, grade: 5, type: "에어컨" },
  { id: 6, grade: 1, type: "냉장고" },
  { id: 7, grade: 3, type: "전기세탁기" },
  { id: 8, grade: 3, type: "냉장고" },
  { id: 9, grade: 4, type: "전기세탁기" },
  { id: 10, grade: 5, type: "에어컨" }
];
