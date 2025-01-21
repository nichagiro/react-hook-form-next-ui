import { Card, CardBody, CardHeader, Divider } from "@heroui/react"
import React, { ReactNode, useState } from "react";
import { Icolor } from "../types/global";
import DoubleArrowUp from "../icons/DoubleArrowUp";
import DoubleArrowDown from "../icons/DoubleArrowDown";

interface RHFNextUiPanelProps {
  title: string;
  children: ReactNode;
  color?: Icolor;
  collapse?: boolean;
}

const Panel = ({ title, color = "default", children, collapse = false }: RHFNextUiPanelProps) => {
  const [expand, setExpand] = useState(true);

  return (
    <Card className="mb-5">
      <CardHeader className={`bg-${color} px-5 text-white flex justify-between`}>
        {title}
        {
          collapse &&
          <div onClick={() => setExpand(!expand)} className="cursor-pointer">
            {expand ? <DoubleArrowUp /> : <DoubleArrowDown />}
          </div>
        }
      </CardHeader>
      <Divider />
      <CardBody className={`p-5 ${expand ? "" : "hidden"}`}>
        {children}
      </CardBody>
    </Card>
  )
}

export default Panel