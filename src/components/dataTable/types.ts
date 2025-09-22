/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputProps, TableProps, TableColumnProps } from "@heroui/react";
import { ReactNode } from "react";
interface ColumnFormat {
  value: any // valor del parametro en especidfico
  row: any  // valor de todo el registro "fila"
}
interface RowsPerPageTableProps {
  default: number  // numero actual a mostrar
  options: number[]   // listado de opciones para filtrar
}
export interface ColumnsTableProps extends Omit<TableColumnProps<any>, "children"> {
  format?: ({ value, row }: ColumnFormat) => ReactNode   // renderiza jsx en la celda
  onFilter?: (value: string | number) => string
  onOrder?: (value: string | number) => string | number
}

interface localeText {
  items: string[]  // mostrar el nombre de los items [singular, plural]
  emptyContent: string  // no rows
  paginateButtons: string[] //boton atras y siguiente [back, next]
  rowsPerPage: string
}
export interface DataTableProps extends TableProps {
  rows: any[]
  columns: ColumnsTableProps[]
  keyRow?: string  // id de cada registro de la data
  rowsPerPageOptions?: RowsPerPageTableProps
  hideRowsPerPageOptions?: boolean  // oculta el número de filas 
  inputSearch?: InputProps // input de búsqueda
  hideFilterSearch?: boolean  // mostrar el filtro de búsqueda
  extraTopContent?: ReactNode
  loading?: boolean
  onSelect?: (row: any) => void
  cellClass?: string // clase de las celdas
  localText?: Partial<localeText>
}
export interface SkeletonTableProps {
  size: number // cantidad de filas a cargar con efecto loading
  columns: ColumnsTableProps[]
}

