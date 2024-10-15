import React, { useMemo } from "react";
import { useTable, Column, ColumnInstance, HeaderGroup, Row, Cell } from "react-table";
import styles from "./PowerTable.module.css";

type TableRow = {
  year: string;
  cost: number;
  usage: number;
};

const sampleData: TableRow[] = [
  { year: "2024년 10월", cost: 50000, usage: 350 },
  { year: "2024년 9월", cost: 45000, usage: 320 },
  { year: "2024년 9월", cost: 45000, usage: 320 },
  { year: "2024년 9월", cost: 45000, usage: 320 },
  { year: "2024년 9월", cost: 45000, usage: 320 },
  { year: "2024년 9월", cost: 45000, usage: 320 },
  { year: "2024년 8월", cost: 43000, usage: 310 }
];

const PowerTable: React.FC = () => {
  const columns: Column<TableRow>[] = useMemo(
    () => [
      {
        Header: "년도",
        accessor: "year"
      },
      {
        Header: "전기요금",
        accessor: "cost"
      },
      {
        Header: "전력사용량",
        accessor: "usage"
      }
    ],
    []
  );

  const data = useMemo(() => sampleData, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<TableRow>({
    columns,
    data
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
