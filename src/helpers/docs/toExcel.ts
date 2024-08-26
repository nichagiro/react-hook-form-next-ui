// import * as XLSX from 'xlsx';
import { utils, writeFile } from 'xlsx';

interface ToExcelExportProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  columns?: string[];
  name: string;
}

export function toExcelExport({ data, columns = [], name }: ToExcelExportProps): void {
  const worksheet = utils.json_to_sheet(data);
  utils.sheet_add_aoa(worksheet, [columns]);

  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet);

  writeFile(workbook, `${name}.xlsx`);
}

