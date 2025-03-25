
import type { Meta, StoryObj } from '@storybook/react';
import DataTable from '../components/dataTable/DataTable';
import { COLORS } from '../static/others';
import { columns } from '../static/columns';
import { fakerRows } from '../static/faker';
import { Button } from "@heroui/react";
import React from 'react';

const meta = {
  title: 'Data/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    color: { options: COLORS, control: "select", type: "string" },
    itemsName: { description: "Display items name", control: "text" },
    inputSearch: { description: "Custon input search" },
    hideFilterSearch: { description: "hide input search" },
    extraTopContent: { description: "Custom rigth content-top" },
    cellClass: { description: "ClassName for row" },
    keyRow: { description: "Key param in rows", control: "text" },
    selectionMode: { options: ["single", "none", "multiple"], control: "select" },
    onSelect: { description: "Return function with rows param" },
    columns: { description: "Additional props: format, dateFormat" },
    rowsPerPageOptions: { description: "RowsPerPage" },
    isVirtualized: {description: "Virtualized table and remove pagination"}
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const ExtraTopContent = () => <Button color='danger'>Downoload</Button>

export const table: Story = {
  args: {
    columns: columns,
    rows: fakerRows(),
    color: 'primary',
    cellClass: "whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[150px]",
    loading: false,
    isVirtualized: false,
    hideFilterSearch: false,
    selectionMode: "multiple",
    hideRowsPerPageOptions: false,
    onSelect: row => console.log(row),
    itemsName: "users",
    keyRow: "id",
    extraTopContent: <ExtraTopContent />,
    rowsPerPageOptions: {
      options: [5, 10, 15, 20, 25, 30],
      default: 5
    }
  },
};
