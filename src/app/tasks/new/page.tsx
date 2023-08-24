"use client";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
//tsx

function FormPage() {
  //Se crea el state para guardar los datos del form
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const router = useRouter();
  const params = useParams();

  const getTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`);
    const data = await res.json();

    setNewTask({
      title: data.title,
      description: data.description,
    });
  };

  //Envia al servidor la peticion de crear la nueva tarea
  const createTask = async () => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.status === 200) {
        router.push("/"); //Regresa al inicio
        router.refresh(); //se usa si la pag de inicio no carga la nueva tarea
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Actualizar tareas
  const updateTask = async () => {
    try {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  //Peticion de borrar al servidor
  const handleDelete = async () => {
    if (window.confirm("Esta seguro que desea eliminar esta tarea?")) {
      try {
        const res = await fetch(`/api/tasks/${params.id}`, {
          method: "DELETE",
        });
        router.push("/");
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Previene el actualizado de la pag cuando se envia el form
  const handleSubtmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!params.id) {
      await createTask();
    } else {
      updateTask();
    }
  };

  //Funcion para tomar los datos del imput y texarea
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //toma el objeto y le agrega los datos nuevos
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (params.id) {
      getTask();
    }
  }, []);

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubtmit}>
        <header className="flex justify-between">
          <h1 className="font-bold text-3xl">
            {!params.id ? "Crear Tarea" : "Editar Tarea"}
          </h1>

          {!params.id ? 
            <></>
          : <button
            type="button"
            className="bg-red-500 px-3 py-1 rounded-md"
            onClick={handleDelete}            
            >
              Borrar
            </button>}
          
        </header>
        <input
          type="text"
          name="title"
          placeholder="Titulo"
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
          onChange={handleChange}
          value={newTask.title}
        />
        <textarea
          name="description"
          rows={3}
          placeholder="Descripcion"
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
          onChange={handleChange}
          value={newTask.description}
        ></textarea>
        <button
          type="submit"
          className="bg-green-600 hover:bg-greem-700 text-white font-bold px-4 rounded-lg"
        >
          {params.id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}

export default FormPage;
