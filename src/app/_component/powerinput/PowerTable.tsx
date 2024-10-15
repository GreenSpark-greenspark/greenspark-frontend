import React, { useMemo } from "react";
import { useTable, Column, ColumnInstance, HeaderGroup, Row, Cell } from "react-table";

type TableRow = {
  year: string;
  cost: number;
  usage: number;
};

const sampleData: TableRow[] = [
  { year: "2024년 10월", cost: 50000, usage: 350 },
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
    <table
      {...getTableProps()}
      style={{ border: "1px solid black", width: "100%", textAlign: "center" }}
    >
      <thead>
        {headerGroups.map((headerGroup: HeaderGroup<TableRow>) => {
          // key를 분리하고 나머지 props를 spread
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
            <tr key={key} {...restRowProps}>
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
  );
};

export default PowerTable;
