import { ReactNode } from "react"
import { Icolor } from "../types/global"

type LayoutProps = {
  children: ReactNode,
  title: string,
  color?: Icolor,
}

const Layout = ({ children, title, color = "primary" }: LayoutProps) => {
  return (
    <>
      <header className={`bg-${color} w-full text-center text-white py-5`}>
        <h1 className="font-bold text-lg">
          {title}
        </h1>
      </header>
      <main className="p-5 2xl:px-16 2xl:py-5 mx-auto">
        {children}
      </main>
    </>
  )
}

export default Layout