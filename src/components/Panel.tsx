import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { ReactNode } from "react";

interface Panel {
  title: string;
  children: ReactNode;
}

const Panel = (props: Panel) => {
  return (
    <Card className="mb-5">
      <CardHeader className="px-5 bg-teal-500 text-white">
        {props.title}
      </CardHeader>
      <Divider />
      <CardBody className="p-5">
        {props.children}
      </CardBody>
    </Card>
  )
}

export default Panel