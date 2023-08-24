import Image from "next/image"
import img from "../img/error-404.png"

function NotFound() {
  return (
    <section className="h-[calc(100vh-7rem)] flex items-center justify-center flex-col">
      <Image src={img} alt="404 not found" />
      <h1 className="text-7xl font-bold block">404</h1>
      <p className="text-slate-300 my-5 text-3xl">Page not found</p>
    </section>
  )
}

export default NotFound