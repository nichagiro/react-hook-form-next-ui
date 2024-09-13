/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonProps, InputProps, TableProps, TableColumnProps } from "@nextui-org/react";
import { ReactNode } from "react";
import { IdateFormats } from "../../types/global";

interface ReturnRowTable {
  value: string;
  row: any;
}

export interface ColumnsTableProps extends Omit<TableColumnProps<any>, "children"> {
  export?: boolean;
  dateFormat?: IdateFormats;
  renderRow?: ({ value, row }: ReturnRowTable) => ReactNode;
}

export interface DataTableProps extends TableProps {
  buttonExcelExport?: Omit<ButtonProps, "onClick">;
  inputSearch?: InputProps;
  excelExport?: boolean;
  exportName?: string;
  rows: any[];
  columns: ColumnsTableProps[];
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
  columns: ColumnsTableProps[];
}
