// 등급(숫자)을 받으면 색을 반환해주는 함수
export const getColorFromGrade = (grade: string): string => {
  switch (grade) {
    case "1":
      return "#8EC63F";
    case "2":
      return "#D6E04C";
    case "3":
      return "#FEF100";
    case "4":
      return "#F9A734";
    case "5":
      return "#ED3125";
    default:
      return "#83c63f";
  }
};
