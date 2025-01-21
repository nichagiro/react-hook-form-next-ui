/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Button, Input, SortDescriptor, Selection, Pagination
} from "@heroui/react";
import TableSkeleton from "./TableSkeleton";

// hooks
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import useDebounce from "../../helpers/hooks/useDebounce";

// uitls
import { parse } from "@formkit/tempo";

// types
import { DataTableProps } from "./types";

const DataTable = ({
  rows, columns, showFilter = true, loading = false, keyRow = "id", defaultSelectedKeys = [], itemsName,
  selectionMode, inputSearch, showHandlePaginate = true, extraTopContent, cellClass,
  onSelect, defaultPaginateNumber = 10, optionsPaginateNumber = [5, 10, 15], ...props
}: DataTableProps) => {

  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(optionsPaginateNumber.includes(defaultPaginateNumber) ? defaultPaginateNumber : optionsPaginateNumber[0]);
  const [page, setPage] = useState<number>(1);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(defaultSelectedKeys));
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: "", direction: "ascending" });

  const searchText = useDebounce(filterValue, 500);

  const hasSearchFilter = Boolean(searchText);

  const handleSelect = useCallback((row: Selection) => {
    setSelectedKeys(row);
    if (!onSelect || selectionMode === "none") return;

    let data: any[] = [];

    if (selectionMode === "single") {
      data = rows.find(item => item[keyRow] == [...row][0]);
    } else if (row === "all") {
      data = rows;
      setSelectedKeys(new Set(rows.map(item => item[keyRow]))); //for bug nextUI
    } else {
      data = rows.filter(item => [...row].includes(item[keyRow])); //multi
    }

    return onSelect(data);
  }, [onSelect, rows, selectionMode, keyRow])

  const filteredItems: any[] = useMemo(() => {
    let data = [...rows];

    if (hasSearchFilter) {
      data = data.filter((item) =>
        Object.values(item as string | number).some((value, index) => {
          const param = Object.keys(item)[index];

          if (!columns.map(col => col.key).includes(param)) {
            return false;
          }

          if (value === null || value === undefined || !value) {
            return false;
          }

          const data = value.toString().toLowerCase().includes(filterValue.toLowerCase())
          return data
        },
        )
      );
    }
    return data;
  }, [filterValue, hasSearchFilter, rows, columns]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first: string | number | null = a[sortDescriptor.column as string | number]
      const second: string | number | null = b[sortDescriptor.column as string | number]
      let cmp: number = 0

      if (!first && !second) cmp = 0;
      if (!first) cmp = -1;
      if (!second) cmp = 1;

      if (typeof first === "number" && typeof second === "number") {
        cmp = first - second;
      }

      if (typeof first === "string" && typeof second === "string") {
        const column = columns.find(item => item.key === sortDescriptor.column)

        if (first && second && column?.dateFormat) {
          try {
            const startDate = parse(first, column.dateFormat);
            const endDate = parse(second, column.dateFormat);
            cmp = startDate > endDate ? 1 : startDate < endDate ? -1 : 0;

          } catch (error) {
            console.warn("date format is not correct", error)
          }

        } else {
          cmp = (first as string).localeCompare(second as string)
        }
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems, columns]);

  const dataRow = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedItems.slice(start, end)
  }, [sortedItems, page, rowsPerPage])


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
    setRowsPerPage(Number(e.target.value) as 5 | 10 | 15);
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
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {[...selectedKeys].length > 0 &&
            <>
              {[...selectedKeys].length} {[...selectedKeys].length === 1
                ? "fila seleccionada"
                : "filas seleccionadas"}
            </>}
        </span>
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
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Atrás
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Siguiente
          </Button>
        </div>
      </div >
    );
  }, [page, pages, onNextPage, onPreviousPage, selectedKeys, props.color]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 relative">
        <div className="flex justify-between gap-3 items-end">
          {
            showFilter &&
            <Input
              {...inputSearch}
              className={inputSearch?.className ?? "w-full sm:max-w-[44%]"}
              placeholder={inputSearch?.placeholder ?? "Buscar..."}
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
            Total {rows.length} {itemsName ?? "datos"}
          </span>
          {
            showHandlePaginate &&
            <label className="flex items-center text-default-400 text-small">
              Filas por página:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
                defaultValue={rowsPerPage}
              >
                {optionsPaginateNumber.map(number =>
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
    filterValue, rows.length, onClear, onRowsPerPageChange,
    inputSearch, extraTopContent, onSearchChange, rowsPerPage,
    showFilter, showHandlePaginate, optionsPaginateNumber, itemsName
  ]);

  return (
    <>
      {loading ? <TableSkeleton columns={columns} size={rowsPerPage} /> :
        <Table
          {...props}
          isHeaderSticky={true}
          aria-label={props["aria-label"] ?? "Tabla de resultados"}
          bottomContent={rows.length > 0 ? bottomContent : undefined}
          bottomContentPlacement="outside"
          topContentPlacement="outside"
          topContent={rows.length > 0 ? topContent : undefined}
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelect}
          selectionMode={selectionMode}
        >
          <TableHeader columns={columns}>
            {column => <TableColumn  {...column} children={undefined} key={column.key} />}
          </TableHeader>
          <TableBody emptyContent="No hay datos." items={dataRow}>
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
        </Table>}
    </>
  )
};

export default DataTable;




