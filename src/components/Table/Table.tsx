import React from "react";
import BackDrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Table.scss";
import classNames from "classnames";

export interface TableField<T> {
  name: keyof T;
  displayName?: string;
}

export interface tableData<T> {
  items: T[];
}

export type FieldBuilder<T, D> = (
  field: TableField<T>,
  data: D,
  row: number,
  column: number
) => React.ReactNode;

export interface TableProps<T, D> {
  fields: TableField<T>[];
  tableData: D[];
  noDataMessage?: string;
  builder: FieldBuilder<T, D>;
  isLoading?: boolean;
  startColumn?: number;
  startRow?: number;
  columns?: number;
  rows?: number;
}

function Table<TField, TData = TField>({
  tableData,
  fields,
  builder,
  isLoading = false,
  columns,
  rows,
  noDataMessage = "No records found to display",
  startColumn = 0,
  startRow = 0,
}: TableProps<TField, TData>) {
  const numberOfColumns = columns || fields.length;
  const numberOfRows = tableData.length > 0 ? rows || tableData.length : 0;
  const columnElements: React.ReactNode[] = [];

  for (let i = startRow; i < startRow + numberOfRows; i += 1) {
    const data = tableData[i];
    const rowElements: React.ReactNode[] = [];

    for (let j = startColumn; j < startColumn + numberOfColumns; j += 1) {
      const field = fields[j];
      rowElements.push(<td key={j}>{builder(field, data, i, j)}</td>);
    }

    columnElements.push(
      <tr key={i} data-testid="product">
        {rowElements}
      </tr>
    );
  }

  return (
    <div className="table-container table-responsive" data-testid="product">
      <table className="table table-borderless table-hover ">
        <thead>
          <tr>
            {fields.map((data) => (
              <th scope="col" key={Math.random().toString()}>
                {data.displayName || data.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="fucking-tbody">{columnElements}</tbody>
      </table>
      <BackDrop
        className="table-loading-back-drop"
        open={!tableData.length && isLoading}
      >
        <CircularProgress size={25} />
      </BackDrop>
      <div
        className={classNames(
          "table-min-height d-flex align-items-center justify-content-center",
          { "d-none": columnElements?.length > 0 }
        )}
      >
        <div className={classNames({ "d-none": isLoading })}>
          {noDataMessage}
        </div>
      </div>
    </div>
  );
}

export default Table;
