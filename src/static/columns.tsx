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
  dateFormat: "DD/MM/YYYY",
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
}, {
  key: "fake",
  title: "Render",
  className: "text-danger",
  format: ({ row }) => {
    const { status } = row as IRows
    return (
      <p className={`text-white ${status === "Activo" ? "bg-success" : "bg-danger"} w-16 rounded text-center my-0.5 p-0`}>
        {status}
      </p>
    )
  }
}]

