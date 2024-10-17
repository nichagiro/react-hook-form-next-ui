/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputProps, TableProps, TableColumnProps } from "@nextui-org/react";
import { ReactNode } from "react";

interface ReturnRowTable {
  value: string;
  row: any;
}

export interface ColumnsTableProps extends Omit<TableColumnProps<any>, "children"> {
  dateFormat?: string;
  renderRow?: ({ value, row }: ReturnRowTable) => ReactNode;
}

export interface DataTableProps extends TableProps {
  inputSearch?: InputProps;
  extraTopContent?: ReactNode;
  rows: any[];
  columns: ColumnsTableProps[];
  loading?: boolean;
  showFilter?: boolean;
  showHandlePaginate?: boolean;
  onSelect?: (row: any) => void;
  defaultPaginateNumber?: 5 | 10 | 15;
  cellClass?: string;
  skeletonSize?: number;
  keyRow?: string;
}

export interface SkeletonTableProps {
  size?: number;
  columns: ColumnsTableProps[];
}
