import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useTable, Column, ColumnInstance, HeaderGroup, Row, Cell, CellProps } from "react-table";
import PowerPopup from "./PowerPopup";
import styles from "./PowerTable.module.css";
import IconPlus from "../../../../public/icon/power_plus.svg";
import IconDropDown from "../../../../public/icon/power_dropdown.svg";
import { apiWrapper } from "@/utils/api";

type TableRow = {
  year: number;
  month: number;
  cost?: number;
  usage_amount?: number;
};

type PowerRowKeys = "cost" | "usage_amount";

// 최근 36개월 계산
const getLast36Months = () => {
  const months: { year: number; month: number }[] = [];
  const currentDate = new Date();

  for (let i = 1; i < 37; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    months.push({ year, month });
  }

  return months;
};

// 드롭다운 년도 계산
const getYearsOptions = () => {
  const currentYear = new Date().getFullYear();
  return [
    { label: `${currentYear}년`, value: currentYear },
    { label: `${currentYear - 1}년`, value: currentYear - 1 },
    { label: `${currentYear - 2}년`, value: currentYear - 2 }
  ];
};

const PowerTable: React.FC = () => {
  const [data, setData] = useState<TableRow[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 팝업 관련 상태 추가
  const [popupInfo, setPopupInfo] = useState<{
    year: number;
    month: number;
    type: "cost" | "usage";
    value?: number;
    recentValue?: number;
  } | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const months = useMemo(getLast36Months, []);
  const yearsOptions = useMemo(getYearsOptions, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiWrapper(
          () =>
            axios.get(`${API_URL}/power/history`, {
              withCredentials: true
            }),
          API_URL
        );

        if (response.data.success) {
          setData(response.data.data);
        } else {
          console.error("API 호출 실패:", response.data.message);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [API_URL]);

  const fullData: TableRow[] = useMemo(() => {
    const filteredMonths = selectedYear
      ? months.filter(monthData => monthData.year === selectedYear)
      : months;

    return filteredMonths.map(monthData => {
      const existingData = data.find(
        row => row.year === monthData.year && row.month === monthData.month
      );
      return (
        existingData || {
          year: monthData.year,
          month: monthData.month
        }
      );
    });
  }, [months, data, selectedYear]);

  const formatMonth = (month: number) => `${month}월`;

  const formatYearMonth = (year: number, month: number) => `${year}년 ${formatMonth(month)}`;

  const handleIconClick = (year: number, month: number, type: "cost" | "usage", value?: number) => {
    const mappedKey: PowerRowKeys = type === "cost" ? "cost" : "usage_amount";

    // 현재 값의 뒤에서부터 탐색
    const recentValueFromPast = fullData
      .filter(
        row =>
          row[mappedKey] !== undefined &&
          row[mappedKey] !== 0 &&
          (row.year < year || (row.year === year && row.month < month))
      )
      .sort((a, b) => b.year - a.year || b.month - a.month) // 최신 순으로 정렬
      .map(row => row[mappedKey])
      .find(val => val !== undefined);

    // 다시 처음부터 탐색
    const recentValueFromStart =
      recentValueFromPast ??
      fullData
        .filter(row => row[mappedKey] !== undefined && row[mappedKey] !== 0)
        .sort((a, b) => b.year - a.year || b.month - a.month)
        .map(row => row[mappedKey])
        .find(val => val !== undefined);

    const valueToUse = recentValueFromStart !== undefined ? recentValueFromStart : 0;

    setPopupInfo({ year, month, type, value, recentValue: valueToUse });
    console.log("powerTable", type, value, valueToUse);
  };

  const handleSave = (year: number, month: number, type: "cost" | "usage", newValue: number) => {
    setData(prevData => {
      // 기존에 존재하는 데이터인지 확인
      const rowExists = prevData.some(row => row.year === year && row.month === month);

      if (rowExists) {
        // 기존 데이터 수정
        return prevData.map(row => {
          if (row.year === year && row.month === month) {
            return type === "cost"
              ? { ...row, cost: newValue }
              : { ...row, usage_amount: newValue };
          }
          return row;
        });
      } else {
        // 새로운 데이터 추가
        const newRow: TableRow = {
          year,
          month,
          ...(type === "cost" ? { cost: newValue } : { usage_amount: newValue })
        };
        return [...prevData, newRow];
      }
    });
  };

  const closePopup = () => {
    setPopupInfo(null);
  };

  const columns = useMemo<Column<TableRow>[]>(
    () => [
      {
        Header: () => (
          <div className={styles.yearHeader}>
            <span className={styles.dropdownbtn} onClick={() => setIsDropdownOpen(prev => !prev)}>
              <p className={styles.dropdownYear}>{selectedYear ? `${selectedYear}년` : "년도"}</p>
              <IconDropDown
                className={`${styles.dropDownIcon} ${isDropdownOpen ? styles.open : ""}`}
              />
            </span>
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {yearsOptions.map(yearOption => (
                  <div
                    key={yearOption.value}
                    className={styles.dropdownItem}
                    onClick={() => {
                      setSelectedYear(yearOption.value);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {yearOption.label}
                  </div>
                ))}
                <div
                  className={styles.dropdownItem}
                  onClick={() => {
                    setSelectedYear(null);
                    setIsDropdownOpen(false);
                  }}
                >
                  모든 년도
                </div>
              </div>
            )}
          </div>
        ),
        accessor: (row: TableRow) => formatYearMonth(row.year, row.month),
        id: "yearMonth"
      },
      {
        Header: () => <div className={styles.yearHeader}>전기요금</div>,
        accessor: "cost",
        Cell: ({ row }: CellProps<TableRow>) => {
          const { year, month } = row.original;
          return row.values.cost ? (
            <div
              className={styles.cellWrapper}
              onClick={() => handleIconClick(year, month, "cost", row.values.cost)}
            >
              {`${row.values.cost.toLocaleString()}원`}
            </div>
          ) : (
            <div
              className={styles.iconWrapper}
              onClick={() => handleIconClick(year, month, "cost")}
            >
              <IconPlus className={styles.plusIcon} />
            </div>
          );
        }
      },
      {
        Header: () => <div className={styles.yearHeader}>전력사용량</div>,
        accessor: "usage_amount",
        Cell: ({ row }: CellProps<TableRow>) => {
          const { year, month } = row.original;
          return row.values.usage_amount ? (
            <div
              className={styles.cellWrapper}
              onClick={() => handleIconClick(year, month, "usage", row.values.usage_amount)}
            >
              {`${row.values.usage_amount.toLocaleString()}kWh`}
            </div>
          ) : (
            <div
              className={styles.iconWrapper}
              onClick={() => handleIconClick(year, month, "usage")}
            >
              <IconPlus className={styles.plusIcon} />
            </div>
          );
        }
      }
    ],
    [isDropdownOpen, yearsOptions, fullData]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<TableRow>({
    columns,
    data: fullData
  });

  return (
    <div className={styles.tableWrap}>
      <p className={styles.tableName}>
        + 버튼을 눌러 새로운 항목을 추가해 봐요!
        <br /> 전기요금과 전력사용량 항목을 선택해 수정할 수도 있어요
      </p>
      <table className={styles.tableContainer} {...getTableProps()}>
        <thead className={styles.tableHead}>
          {headerGroups.map((headerGroup: HeaderGroup<TableRow>) => {
            const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column: ColumnInstance<TableRow>) => {
                  const { key, ...rest } = column.getHeaderProps();
                  return (
                    <th key={key} {...rest}>
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: Row<TableRow>) => {
            prepareRow(row);
            const { key, ...rest } = row.getRowProps();
            return (
              <tr key={key} className={styles.tableRow} {...rest}>
                {row.cells.map((cell: Cell<TableRow>) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={key} {...restCellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {popupInfo && (
        <PowerPopup
          // userId={userId}
          year={popupInfo.year}
          month={popupInfo.month}
          type={popupInfo.type}
          value={popupInfo.value}
          recentValue={popupInfo.recentValue}
          onClose={closePopup}
          onSave={(newValue: number) => {
            if (popupInfo) {
              handleSave(popupInfo.year, popupInfo.month, popupInfo.type, newValue);
              closePopup();
            }
          }}
        />
      )}
    </div>
  );
};

export default PowerTable;
