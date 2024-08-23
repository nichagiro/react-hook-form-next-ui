import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { ReactNode } from "react";
import { Icolor } from "../types/global";

interface PanelProps {
  title: string;
  children: ReactNode;
  color?: Icolor;
}

const Panel = ({ title, color = "primary", children }: PanelProps) => {
  return (
    <Card className="mb-5">
      <CardHeader className={`bg-${color} px-5 text-white`}>
        {title}
      </CardHeader>
      <Divider />
      <CardBody className="p-5">
        {children}
      </CardBody>
    </Card>
  )
}

export default Panel