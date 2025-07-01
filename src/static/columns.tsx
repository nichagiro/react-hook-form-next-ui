import React from "react";
import { ColumnsTableProps } from "../components/dataTable/types";

export const columns: ColumnsTableProps[] = [{
  key: "service",
  title: "Servicio/Área",
  allowsSorting: true,
  className: "text-danger",
}, {
  key: "topic",
  title: "Tema",
  allowsSorting: true,
  className: "text-danger",
}, {
  key: "date",
  title: "Fecha",
  allowsSorting: true,
  className: "text-danger",
  format: ({ value }) => new Date(value).toLocaleDateString(),
  onFilter: (value) => new Date(value).toLocaleDateString(),

}, {
  key: "value",
  title: "Valor",
  allowsSorting: true,
  className: "text-danger",
}, {
  key: "status",
  title: "Estado",
  allowsSorting: true,
  className: "text-danger",
  onFilter: (value) => value === "Activo" ? "nico" : "angela",
  onOrder: (value) => value === "Activo" ? "nico" : "angela"
}, {
  key: "fake",
  title: "Render",
  className: "text-danger",
  format: ({ row }: { row: IRows }) => {
    const { status } = row
    return (
      <p className={`text-white ${status === "Activo" ? "bg-success" : "bg-danger"} w-16 rounded text-center my-0.5 p-0`}>
        {status}
      </p>
    )
  }
}]

