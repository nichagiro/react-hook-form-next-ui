/* eslint-disable @typescript-eslint/no-explicit-any */

import { SortDescriptor, TableProps } from "@nextui-org/react";
import { ReactNode } from "react";

interface ReturnRow {
  value: string;
  row?: unknown
}

interface RenderRow {
  key: string;
  render: ({ value, row }: ReturnRow) => ReactNode;
}

export interface Props extends TableProps {
  rows: any[];
  columns: any[];
  sortColumn?: SortDescriptor;
  loading?: boolean;
  renderRow?: RenderRow[];
  showFilter?: boolean;
  showHandlePaginate?: boolean;
  onSelect?: (row: unknown) => void;
  defaultPaginateNumber?: 5 | 10 | 15;
  cellClass?: string;
  skeletonSize?: number;
  noFilters?: string[];
}