import Link from "next/link"

function Navbar() {
  return (
    <nav className="bg-gray-950 py-5 mb-2">
      <div className="container flex justify-between px-10 md:px-0 mx-auto">
        <Link href='/'>
          <h1 className="text-2xl font-bold">Creador de Tareas</h1>
        </Link>
        <ul className="flex gap-x-4">
          <li>
            <Link href="/tasks/new">Nueva Tarea</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar