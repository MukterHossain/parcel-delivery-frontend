import type { ReactNode } from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"


interface IProps{
    children:ReactNode
}
export default function CommonLayout({children} : IProps) {
  return (
    <div className="flex max-w-7xl mx-auto flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="flex-1 container mx-auto px-4 py-8">
        {children}
      </div>
      
      <Footer></Footer>
    </div>
  )
}
