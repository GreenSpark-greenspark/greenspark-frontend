export interface GetDateLabel {
  yearLabel: string;
  monthLabel: string;
  dateLabel: Date;
}

export function getDateLabel(type: "current" | "last" | "twoMonths" | "threeMonths"): GetDateLabel {
  const now = new Date();
  let monthLabel = "";
  let yearLabel = "";
  let dateLabel: Date;

  switch (type) {
    case "last":
      dateLabel = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      yearLabel = dateLabel.getFullYear().toString();
      monthLabel = (dateLabel.getMonth() + 1).toString();
      break;

    case "twoMonths":
      dateLabel = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      yearLabel = dateLabel.getFullYear().toString();
      monthLabel = (dateLabel.getMonth() + 1).toString();
      break;

    case "threeMonths":
      dateLabel = new Date(now.getFullYear(), now.getMonth() - 3, 1);
      yearLabel = dateLabel.getFullYear().toString();
      monthLabel = (dateLabel.getMonth() + 1).toString();
      break;

    case "current":
    default:
      dateLabel = new Date(now.getFullYear(), now.getMonth(), 1);
      yearLabel = dateLabel.getFullYear().toString();
      monthLabel = (dateLabel.getMonth() + 1).toString();
      break;
  }

  return { yearLabel, monthLabel, dateLabel };
}
