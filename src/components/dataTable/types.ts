/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputProps, TableProps, TableColumnProps } from "@heroui/react";
import { ReactNode } from "react";
interface ColumnFormat {
  value: string // valor del parametro en especidfico
  row: any  // valor de todo el registro "fula"
}
interface RowsPerPageTableProps {
  default: number  // numero actual a mostrar
  options: number[]   // listado de opciones para filtrar
}
export interface ColumnsTableProps extends Omit<TableColumnProps<any>, "children"> {
  format?: ({ value, row }: ColumnFormat) => ReactNode   // renderiza jsx en la celda
  dateFormat?: string  // formato especial para manejar fechas
}
export interface DataTableProps extends TableProps {
  rows: any[]
  keyRow?: string  // id de cada registro de la data
  rowsPerPageOptions?: RowsPerPageTableProps
  hideRowsPerPageOptions?: boolean  // oculta el número de filas 
  inputSearch?: InputProps // input de búsqueda
  hideFilterSearch?: boolean  // mostrar el filtro de búsqueda
  extraTopContent?: ReactNode
  columns: ColumnsTableProps[]
  loading?: boolean
  onSelect?: (row: any) => void
  itemsName?: string  // mostrar el nombre de los items
  cellClass?: string // clase de las celdas
}
export interface SkeletonTableProps {
  size?: number // cantidad de filas a cargar con efecto loading
  columns: ColumnsTableProps[]
}

