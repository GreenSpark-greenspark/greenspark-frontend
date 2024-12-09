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

// 등급(숫자)을 받으면 그라데이션 색 3개를 반환해주는 함수
export const getGradientFromGrade = (
  grade: string
): { first: string; second: string; third: string } | undefined => {
  switch (grade) {
    case "1":
      return {
        first: "#D7F3C6",
        second: "#91E26B",
        third: "#D7F3C6"
      };
    case "2":
      return {
        first: "#ECF0B9",
        second: "#D6E04C",
        third: "#ECF0B9"
      };
    case "3":
      return {
        first: "#FFFCCC",
        second: "#FEF100",
        third: "#FFFCCC"
      };
    case "4":
      return {
        first: "#FDE8CB",
        second: "#F9A734",
        third: "#FDE8CB"
      };
    case "5":
      return {
        first: "#F8CAC7",
        second: "#ED3125",
        third: "#F8CAC7"
      };
  }
};
