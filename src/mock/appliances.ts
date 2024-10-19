export type ApplianceType = "airconditioner" | "refrigerator" | "washingMachine";

export const data: { id: number; grade: number; type: ApplianceType }[] = [
  { id: 1, grade: 1, type: "airconditioner" },
  { id: 2, grade: 3, type: "refrigerator" },
  { id: 3, grade: 3, type: "washingMachine" },
  { id: 4, grade: 4, type: "airconditioner" },
  { id: 5, grade: 5, type: "refrigerator" },
  { id: 6, grade: 1, type: "washingMachine" },
  { id: 7, grade: 3, type: "airconditioner" },
  { id: 8, grade: 3, type: "refrigerator" },
  { id: 9, grade: 4, type: "washingMachine" },
  { id: 10, grade: 5, type: "airconditioner" }
];
