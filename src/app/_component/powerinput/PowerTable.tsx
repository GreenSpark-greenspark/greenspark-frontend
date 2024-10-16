import React, { useMemo, useState } from "react";
import { useTable, Column, ColumnInstance, HeaderGroup, Row, Cell } from "react-table";
import styles from "./PowerTable.module.css";
import IconPlus from "../../../../public/icon/power_plus.svg";
import IconDropDown from "../../../../public/icon/power_dropdown.svg";

type TableRow = {
  year: string;
  cost?: number;
  usage?: number;
};

// 최근 36개월 계산
const getLast36Months = () => {
  const months: string[] = [];
  const currentDate = new Date();

  for (let i = 0; i < 36; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = date.toLocaleString("ko-KR", { month: "long" });
    months.push(`${year}년 ${month}`);
  }

  return months;
};

// 드롭다운 년도 계산
const getYearsOptions = () => {
  const currentYear = new Date().getFullYear();
  return [
    { label: `${currentYear}년`, value: `${currentYear}년` },
    { label: `${currentYear - 1}년`, value: `${currentYear - 1}년` },
    { label: `${currentYear - 2}년`, value: `${currentYear - 2}년` }
  ];
};

const PowerTable: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const months = useMemo(getLast36Months, []);
  const yearsOptions = useMemo(getYearsOptions, []); // 드롭다운에 표시할 년도 옵션

  const sampleData: TableRow[] = [
    { year: "2024년 10월", cost: 54000, usage: 30 },
    { year: "2024년 9월", cost: 45000, usage: 320 },
    { year: "2024년 5월", cost: 45000, usage: 320 },
    { year: "2024년 6월", cost: 45000, usage: 320 },
    { year: "2024년 8월", cost: 43000 }
  ];

  // 선택한 년도에 맞게 데이터 필터링
  const fullData: TableRow[] = useMemo(() => {
    const filteredMonths = selectedYear
      ? months.filter(month => month.startsWith(selectedYear))
      : months;

    return filteredMonths.map(month => {
      const existingData = sampleData.find(row => row.year === month);
      return existingData || { year: month };
    });
  }, [months, sampleData, selectedYear]);

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
        accessor: "year"
      },
      {
        Header: "전기요금",
        accessor: "cost",
        Cell: ({ value }: Cell<TableRow>) => {
          return value !== undefined ? (
            `${value.toLocaleString()}원`
          ) : (
            <IconPlus className={styles.plusIcon} />
          );
        }
      },
      {
        Header: "전력사용량",
        accessor: "usage",
        Cell: ({ value }: Cell<TableRow>) => {
          return value !== undefined ? (
            `${value.toLocaleString()}kWh`
          ) : (
            <IconPlus className={styles.plusIcon} />
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
                    cell.column.id === "year"
                      ? styles.yearCell
                      : cellIndex === 1
                        ? styles.costUsageDivider // 전기요금 셀에만 좌측에 줄을 추가
                        : "";

                  return (
                    <td key={key} className={cellClassName} {...restCellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PowerTable;
