import { ReactNode } from "react"

type Props = {
  children: ReactNode,
  title: string
}

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <header className="w-full text-center bg-teal-500 text-white py-5">
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