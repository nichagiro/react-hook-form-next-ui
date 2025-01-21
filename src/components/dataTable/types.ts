/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputProps, TableProps, TableColumnProps } from "@heroui/react";
import { ReactNode } from "react";
interface ColumnFormat {
  value: string;
  row: any;
}
export interface ColumnsTableProps extends Omit<TableColumnProps<any>, "children"> {
  format?: ({ value, row }: ColumnFormat) => ReactNode;
  dateFormat?: string;
}
export interface DataTableProps extends TableProps {
  inputSearch?: InputProps;
  extraTopContent?: ReactNode;
  rows: any[];
  columns: ColumnsTableProps[];
  loading?: boolean;
  showFilter?: boolean;
  onSelect?: (row: any) => void;
  showHandlePaginate?: boolean;
  defaultPaginateNumber?: number;
  optionsPaginateNumber?: number[];
  itemsName?: string;
  cellClass?: string;
  keyRow?: string;
}
export interface SkeletonTableProps {
  size?: number;
  columns: ColumnsTableProps[];
}
