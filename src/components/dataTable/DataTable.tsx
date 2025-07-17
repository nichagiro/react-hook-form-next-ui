/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Button, Input, SortDescriptor, Selection, Pagination
} from "@heroui/react";

import TableSkeleton from "./TableSkeleton";
import SearchIcon from "../../icons/SearchIcon";

import { DataTableProps } from "./types";
import useDebounce from "../../hooks/useDebounce";

const DataTable = ({
  hideFilterSearch, loading, isVirtualized, onSelect, onSelectionChange,
  selectionMode, inputSearch, hideRowsPerPageOptions, extraTopContent, cellClass,
  rows = [], columns = [], keyRow = "id",
  localText = {
    emptyContent: "No hay datos.",
    rowsPerPage: "Filas por pagina"
  },
  rowsPerPageOptions = { default: 10, options: [5, 10, 15] },
  ...props
}: DataTableProps) => {

  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions.default);
  const [page, setPage] = useState<number>(1);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor | undefined>();

  const searchText = useDebounce(filterValue, 500);
  const hasSearchFilter = Boolean(searchText);
  const selectedCount = useMemo(() => [...selectedKeys].length, [selectedKeys])

  useEffect(() => {
    if (rows) {
      setPage(1);
      setSelectedKeys(new Set());
    }
  }, [rows])

  const handleSelect = useCallback((row: Selection) => {
    setSelectedKeys(row);

    let data: any[] = [];

    if (selectionMode === "single") {
      data = rows.find(item => item[keyRow] == [...row][0]);
    } else if (row === "all") {
      data = rows;
      setSelectedKeys(new Set(rows.map(item => item[keyRow].toString()))); //for bug nextUI
    } else {
      data = rows.filter(item => [...row].includes(item[keyRow].toString())); //multi
    }

    if (onSelect) onSelect(data);
    if (onSelectionChange) onSelectionChange(row)

  }, [onSelect, rows, selectionMode, keyRow, onSelectionChange])

  const filteredItems: any[] = useMemo(() => {
    let data = [...rows];

    if (hasSearchFilter) {
      data = data.filter(item =>
        Object.values(item as string | number).some((value, index) => {
          const param = Object.keys(item)[index];
          const columnKey = columns.find(col => col.key == param)

          if (!columnKey) {
            return false;
          }

          if (value === null || value === undefined || !value) {
            return false;
          }

          const filter = columnKey.onFilter ? columnKey.onFilter(value) : value
          const data = filter.toString().toLowerCase().includes(filterValue.toLowerCase())

          return data
        },
        )
      );
    }
    return data;
  }, [filterValue, hasSearchFilter, rows, columns]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const sortedItems = useMemo(() => {
    if (sortDescriptor === undefined) return filteredItems

    return [...filteredItems].sort((a, b) => {
      const column = columns.find(col => col.key === sortDescriptor.column)

      const first = column?.onOrder ? column.onOrder(a[sortDescriptor.column]) : a[sortDescriptor.column]
      const second = column?.onOrder ? column.onOrder(b[sortDescriptor.column]) : b[sortDescriptor.column]
      let cmp: number = 0

      if (!first && !second) cmp = 0;
      if (!first) cmp = -1;
      if (!second) cmp = 1;

      if (typeof first === "number" && typeof second === "number") {
        cmp = first - second;
      }

      if (typeof first === "string" && typeof second === "string") {
        cmp = (first ?? "").localeCompare(second ?? "")
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems, columns]);

  const dataRow = useMemo(() => {
    if (isVirtualized) return sortedItems;

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedItems.slice(start, end)
  }, [sortedItems, page, rowsPerPage, isVirtualized])


  const onClear = useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const renderCell = useCallback((item: any, columnKey: string) => {
    const data = columns.find(item => item.key === columnKey)!;

    // formatter row
    if (data.format) {
      return (
        <div>
          {data.format({
            value: item[columnKey],
            row: item
          })}
        </div>
      )
    }

    return <p title={item[columnKey] as string}>{item[columnKey]}</p>

  }, [columns]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 mt-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedCount > 0 &&
            <>
              {selectedCount} {selectedCount === 1 ? (localText?.items?.[0] ?? "fila seleccionada") : (localText?.items?.[1] ?? "filas seleccionadas")}
            </>
          }
        </span>
        {
          !isVirtualized &&
          <>
            <Pagination
              isCompact
              showControls
              showShadow
              page={page}
              total={pages}
              onChange={setPage}
              color={props.color}
            />
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
              <Button isDisabled={page === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                {localText.paginateButtons?.[0] ?? "Atrás"}
              </Button>
              <Button isDisabled={page === pages} size="sm" variant="flat" onPress={onNextPage}>
                {localText.paginateButtons?.[1] ?? "Siguiente"}
              </Button>
            </div>
          </>
        }
      </div >
    );
  }, [
    page, pages, onNextPage, onPreviousPage, selectedCount,
    props.color, isVirtualized, localText.paginateButtons, localText.items]
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 relative pb-2">
        <div className="flex justify-between gap-3 items-end">
          {
            !hideFilterSearch &&
            <Input
              {...inputSearch}
              className={inputSearch?.className ?? "w-full sm:max-w-[44%]"}
              placeholder={inputSearch?.placeholder ?? "Buscar..."}
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
              isClearable
            />
          }
          {extraTopContent}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {rows.length} {rows.length == 1 ? (localText?.items?.[0] ?? "dato") : (localText?.items?.[1] ?? "datos")}
          </span>
          {
            !hideRowsPerPageOptions && !isVirtualized &&
            <label className="flex items-center text-default-400 text-small">
              {localText.rowsPerPage}:
              <select
                className="bg-transparent outline-none text-default-400 text-small cursor-pointer"
                onChange={onRowsPerPageChange}
                defaultValue={rowsPerPage}
              >
                {rowsPerPageOptions.options.map(number =>
                  <option key={number} value={number}>
                    {number}
                  </option>
                )}
              </select>
            </label>
          }
        </div>
      </div>
    );
  }, [
    filterValue, rows.length, onClear, onRowsPerPageChange, localText.rowsPerPage,
    inputSearch, extraTopContent, onSearchChange, rowsPerPage, isVirtualized,
    hideFilterSearch, hideRowsPerPageOptions, rowsPerPageOptions, localText.items,
  ]);

  return (
    <>
      {
        loading ? <TableSkeleton columns={columns} size={rowsPerPage} /> :
          <>
            {topContent}

            <Table
              {...props}
              aria-label={props["aria-label"] ?? "Tabla de resultados"}
              isVirtualized={isVirtualized}
              sortDescriptor={sortDescriptor}
              onSortChange={setSortDescriptor}
              selectedKeys={selectedKeys}
              onSelectionChange={handleSelect}
              selectionMode={selectionMode}
            >
              <TableHeader columns={columns}>
                {column => <TableColumn  {...column} children={undefined} key={column.key} />}
              </TableHeader>

              <TableBody emptyContent={localText.emptyContent} items={dataRow}>
                {
                  item =>
                    <TableRow key={item[keyRow]}>
                      {
                        columnKey =>
                          <TableCell className={cellClass}>
                            {renderCell(item, columnKey as string)}
                          </TableCell>
                      }
                    </TableRow>
                }
              </TableBody>
            </Table>

            {bottomContent}
          </>
      }
    </>
  )
};

export default DataTable;




