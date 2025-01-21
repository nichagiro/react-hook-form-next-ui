
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
    optionsPaginateNumber: { description: "Rows for pages" },
    showHandlePaginate: { description: "Show optionsPaginateNumber " },
    itemsName: { description: "Display items name", control: "text" },
    inputSearch: { description: "Custon input search" },
    showFilter: { description: "Show input search" },
    extraTopContent: { description: "Custom rigth content-top" },
    cellClass: { description: "ClassName for row" },
    keyRow: { description: "Key param in rows", control: "text" },
    selectionMode: { options: ["single", "none", "multiple"], control: "select" },
    onSelect: { description: "Return function with rows param" },
    columns: { description: "Additional props: format, dateFormat" }
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;


const ExtraTopContent = () => <Button color='danger'>Downoload</Button>

const OptionsPaginateNumber = [1, 3, 5]

const DefaultSelectedKeys = ["1", "5"]

export const table: Story = {
  args: {
    columns: columns,
    rows: fakerRows(),
    optionsPaginateNumber: OptionsPaginateNumber,
    defaultPaginateNumber: 3,
    color: 'primary',
    cellClass: "whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[150px]",
    loading: false,
    showFilter: true,
    selectionMode: "multiple",
    showHandlePaginate: true,
    onSelect: row => console.log(row),
    itemsName: "users",
    keyRow: "id",
    extraTopContent: <ExtraTopContent />,
    defaultSelectedKeys: DefaultSelectedKeys,
  },
};
