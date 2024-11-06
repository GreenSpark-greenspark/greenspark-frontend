import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useTable, Column, ColumnInstance, HeaderGroup, Row, Cell } from "react-table";
import PowerPopup from "./Popup";
import styles from "./PowerTable.module.css";
import IconPlus from "../../../../public/icon/power_plus.svg";
import IconDropDown from "../../../../public/icon/power_dropdown.svg";

type TableRow = {
  year: number;
  month: number;
  cost?: number;
  usage_amount?: number;
};

// 최근 36개월 계산
const getLast36Months = () => {
  const months: { year: number; month: number }[] = [];
  const currentDate = new Date();

  for (let i = 0; i < 36; i++) {
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
  } | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const userId = 1;

  const months = useMemo(getLast36Months, []);
  const yearsOptions = useMemo(getYearsOptions, []); // 드롭다운에 표시할 년도 옵션

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/power/history/${userId}`);
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
  }, [userId]);

  // 선택한 년도에 맞게 데이터 필터링
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

  const handleIconClick = (year: number, month: number, type: "cost" | "usage") => {
    console.log("플러스 아이콘 클릭됨:", { year, month, type }); // 추가
    setPopupInfo({ year, month, type });
  };

  const closePopup = () => {
    setPopupInfo(null);
  };

  // 테이블에 필요한 컬럼 정의
  const columns: Column<TableRow>[] = useMemo(
    () => [
      {
        Header: () => (
          <div className={styles.yearHeader}>
            <span className={styles.dropdownbtn} onClick={() => setIsDropdownOpen(prev => !prev)}>
              년도
              <IconDropDown className={styles.dropDownIcon} />
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
        Header: "전기요금",
        accessor: "cost",
        Cell: ({ row }: Cell<TableRow>) => {
          const { year, month } = row.original;
          return row.values.cost !== undefined ? (
            `${row.values.cost.toLocaleString()}원`
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
        Header: "전력사용량",
        accessor: "usage_amount",
        Cell: ({ row }: Cell<TableRow>) => {
          const { year, month } = row.original;
          return row.values.usage_amount !== undefined ? (
            `${row.values.usage_amount.toLocaleString()}kWh`
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
    [isDropdownOpen, yearsOptions]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<TableRow>({
    columns,
    data: fullData
  });

  return (
    <div className={styles.tableWrap}>
      <p className={styles.tableName}>+ 버튼을 눌러 입력할 수 있어요!</p>
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
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr key={key} className={styles.tableRow} {...restRowProps}>
                {row.cells.map((cell: Cell<TableRow>, cellIndex: number) => {
                  const { key, ...restCellProps } = cell.getCellProps();

                  // 년도 셀
                  const cellClassName =
                    cell.column.id === "yearMonth"
                      ? styles.yearCell
                      : cellIndex === 1
                        ? styles.costUsageDivider // 전기요금 셀에만 좌측에 줄을 추가
                        : "";

                  return (
                    <td
                      key={key}
                      className={`${styles.tableCell} ${cellClassName}`}
                      {...restCellProps}
                    >
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
          year={popupInfo.year}
          month={popupInfo.month}
          type={popupInfo.type}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default PowerTable;
