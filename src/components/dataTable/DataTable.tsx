/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
  Button, Input, SortDescriptor, Selection
} from "@nextui-org/react";

// hooks
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import useDebounce from "../../helpers/hooks/useDebounce";

// uitls and icons
import moment from "moment";
import { toExcelExport } from "../../helpers/docs/toExcel";
import { ExcelIcon } from "../../icons/ExcelIcon";

// ui and types
import TableSkeleton from "./TableSkeleton";
import { DataTableProps } from "./types";


const DataTable = ({
  rows, columns, sortColumn, showFilter = true, loading, color, keyRow = "id",
  skeletonSize, selectionMode, variantInputSearch, showHandlePaginate = true,
  onSelect, defaultPaginateNumber = 10, cellClass, noFilters, download, ...props
}: DataTableProps) => {

  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(defaultPaginateNumber);
  const [page, setPage] = useState<number>(1);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(sortColumn ?? {});

  const searchText = useDebounce(filterValue, 500);

  const hasSearchFilter = Boolean(searchText);

  const handleSelect = useCallback((row: Selection) => {
    setSelectedKeys(row);
    if (!onSelect || selectionMode === "none") return;

    let data: any[] = [];

    if (selectionMode === "single") {
      data = rows.find(item => item[keyRow] === [...row][0]);
    } else if (row === "all") {
      data = rows;
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

          if (noFilters?.includes(param)) {
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
  }, [filterValue, hasSearchFilter, rows, noFilters]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      let first = a[sortDescriptor.column as string | number];
      let second = b[sortDescriptor.column as string | number];

      const formats = ['DD/MM/YYYY', 'YYYY-MM-DD', 'DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm'];
      const startDate = moment(first, formats, true)
      const endDate = moment(second, formats, true)

      if (startDate.isValid() && endDate.isValid()) {
        first = moment(startDate).format("x");
        second = moment(endDate).format("x");
      }

      if (first === second) return 0;

      const cmp = first > second ? 1 : -1;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

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

    if (data.renderRow) {
      return data.renderRow({
        value: item[columnKey],
        row: item
      })
    }

    return <p title={item[columnKey] as string}> {item[columnKey] as string} </p>
  }, [columns]);

  const toExport = useCallback(() => {
    const dataExport = columns.filter(col => col.export).map(item => item.key)

    const data = rows.map(item => {
      const values: Record<string, number> = {}

      Object.keys(item).forEach(param => {
        if (dataExport.includes(param)) {
          values[param] = typeof item[param] === "boolean"
            ? item[param] ? "Activo" : "Inactivo"
            : item[param]
        }
      })
      return values
    })

    toExcelExport({
      data,
      name: "DataTableExcel",
      columns: columns.filter(item => item.export).map(col => col.title?.toString() ?? ""),
    })

  }, [columns, rows])

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {
            selectionMode !== "none" && ([...selectedKeys].length > 0 || selectedKeys === "all") &&
            <>
              {selectedKeys !== "all" && [...selectedKeys].length}
              {
                selectedKeys === "all"
                  ? "Todos los datos seleccionados"
                  : [...selectedKeys].length === 1 ? " dato seleccionado" : " datos seleccionados"
              }
            </>
          }
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Atrás
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onNextPage, onPreviousPage, selectedKeys, selectionMode]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 relative">
        <div className="flex justify-between gap-3 items-end">
          {
            showFilter &&
            <Input
              color={"primary"}
              id="input-serch-table"
              isClearable
              variant={variantInputSearch}
              className="w-full sm:max-w-[44%]"
              placeholder="Buscar..."
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          }
          {
            download &&
            <Button
              type="button"
              color={color}
              onClick={() => toExport()}
              startContent={<ExcelIcon size={6} />}
            >
              Descargar
            </Button>
          }
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {rows.length} {rows.length === 1 ? "dato" : "datos"}
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
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          }
        </div>
      </div>
    );
  }, [
    filterValue, rows.length, onClear, onRowsPerPageChange, variantInputSearch, download,
    onSearchChange, rowsPerPage, showFilter, showHandlePaginate, color, toExport,
  ]);

  return (
    <>
      {loading ? <TableSkeleton columns={columns} size={skeletonSize} /> :
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
          <TableHeader columns={columns} >
            {column => <TableColumn  {...column} className={`text-${color}`} children={undefined} key={column.key} />}
          </TableHeader>
          <TableBody emptyContent="No hay datos." items={dataRow}>
            {
              item =>
                <TableRow key={item[keyRow]}>
                  {
                    columnKey =>
                      <TableCell className={cellClass ?? "whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[150px]"}>
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







