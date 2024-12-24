import { Fragment, ReactNode } from "react";

interface ColumnConfig<T> {
  label: string;
  render: (data: T) => ReactNode;
  header?: () => ReactNode;
}

interface GradeTableProps<T> {
  data: T[];
  config: ColumnConfig<T>[];
  keyFn: (data: T) => number;
  onRowClick?: (data: T) => void;
}

function GradeTable<T>({ data, config, keyFn, onRowClick }: GradeTableProps<T>) {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return <th className="p-2" key={column.label}>{column.label}</th>;
  });

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td
          className="border-b px-4 py-2 text-center text-fg-soft"
          key={column.label}
        >
          {column.render(rowData)}
        </td>
      );
    });

    return (
      <tr
        className="transition duration-150 ease-in-out hover:bg-bg-soft cursor-pointer"
        key={keyFn(rowData)}
        onClick={() => onRowClick && onRowClick(rowData)}
      >
        {renderedCells}
      </tr>
    );
  });

  return (
    <table className="bg-bg-softer min-w-full rounded-lg border-t shadow-md">
      <thead>
        <tr className="border-b px-4 py-8 text-sm font-medium text-fg-soft">
          {renderedHeaders}
        </tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}

export default GradeTable;
