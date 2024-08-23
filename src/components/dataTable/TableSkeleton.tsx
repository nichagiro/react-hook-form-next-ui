import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Skeleton } from "@nextui-org/react";
import { SkeletonTableProps } from "./types";

const TableSkeleton = ({ size, columns }: SkeletonTableProps) => {
  return (
    <Table aria-label="Tabla de resultados">
      <TableHeader>
        {columns.map((column) =>
          <TableColumn {...columns} key={column.key}>
            {column.children}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {Array.from({ length: size ?? 10 }, (_, index) =>
          <TableRow key={index}>
            {() =>
              <TableCell>
                <Skeleton className="h-5 w-4/5 rounded-lg" />
              </TableCell>
            }
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TableSkeleton