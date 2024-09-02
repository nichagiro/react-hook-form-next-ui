/* eslint-disable @typescript-eslint/no-explicit-any */

import { ButtonProps, InputProps, TableProps, TableColumnProps } from "@nextui-org/react";
import { ReactNode } from "react";

interface ReturnRow {
  value: string;
  row: unknown;
}

interface Columns extends Omit<TableColumnProps<any>, "children"> {
  export?: boolean;
  renderRow?: ({ value, row }: ReturnRow) => ReactNode;
}

export interface DataTableProps extends TableProps {
  buttonExcelExport?: Omit<ButtonProps, "onClick">;
  inputSearch?: InputProps;
  excelExport?: boolean;
  rows: any[];
  columns: Columns[];
  loading?: boolean;
  showFilter?: boolean;
  showHandlePaginate?: boolean;
  onSelect?: (row: unknown) => void;
  defaultPaginateNumber?: 5 | 10 | 15;
  cellClass?: string;
  skeletonSize?: number;
  keyRow?: string;
}

export interface SkeletonTableProps {
  size?: number;
  columns: Columns[];
}
