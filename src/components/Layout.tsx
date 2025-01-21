import React, { ReactNode } from "react"
import { Icolor } from "../types/global"
import { Divider } from "@heroui/react"

type RHFNextUiLayoutProps = {
  children: ReactNode,
  title: string,
  color?: Icolor,
}

const Layout = ({ children, title, color = "primary" }: RHFNextUiLayoutProps) => {
  return (
    <>
      <header className={`bg-${color} w-full text-center text-white py-5`}>
        <h1 className="font-bold text-lg">
          {title}
        </h1>
      </header>
      <Divider />
      <main className="p-5 2xl:px-16 2xl:py-5 mx-auto">
        {children}
      </main>
    </>
  )
}

export default Layout