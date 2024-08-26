/* eslint-disable @typescript-eslint/no-explicit-any */

import { SortDescriptor, TableColumnProps, TableProps } from "@nextui-org/react";
import { ReactNode } from "react";
import { Ivariant } from "../../types/global";

interface ReturnRow {
  value: string;
  row?: unknown;
}

interface Columns extends Omit<TableColumnProps<any>, "children"> {
  export?: boolean;
  renderRow?:  ({ value, row }: ReturnRow) => ReactNode;
}

export interface DataTableProps extends TableProps {  
  download?: boolean;
  rows: any[];
  columns: Columns[];
  sortColumn?: SortDescriptor;
  loading?: boolean;
  showFilter?: boolean;
  showHandlePaginate?: boolean;
  onSelect?: (row: unknown) => void;
  defaultPaginateNumber?: 5 | 10 | 15;
  cellClass?: string;
  skeletonSize?: number;
  variantInputSearch?: Ivariant;
  keyRow?: string;
}

export interface SkeletonTableProps {
  size?: number;
  columns: Columns[];
}
