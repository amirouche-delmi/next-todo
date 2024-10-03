"use client";

import Todo from "@/components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios("/api");
      setTodoData(response.data);
    } catch (error) {
      toast.error("Erreur lors de la récupération des Todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api", formData);
      toast.success(response.data.msg);
      setFormData({ title: "", description: "" }); // Réinitialiser le formulaire après l'ajout
      fetchTodos(); // Récupérer les todos après l'ajout
    } catch (error) {
      toast.error("Erreur lors de l'ajout du Todo");
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const response = await axios.delete("/api", {
        params: {
          mongoId: todoId,
        },
      });
      toast.success(response.data.msg);
      fetchTodos();
    } catch (error) {
      toast.error("Erreur lors de la suppression du Todo");
    }
  };

  const completeTodo = async (id) => {
    try {
      const response = await axios.put("/api", {}, {
        params: {
          mongoId: id,
        },
      });
  
      toast.success(response.data.msg);
      fetchTodos(); // Récupérer les todos après la mise à jour
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du Todo");
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto"
      >
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full focus:border-blue-500 focus:outline-none transition duration-150 border-gray-300 rounded-md"
          value={formData.title}
          onChange={onChangeHandler}
        />
        <textarea
          name="description"
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full focus:border-blue-500 focus:outline-none transition duration-150 border-gray-300 rounded-md"
          value={formData.description}
          onChange={onChangeHandler}
        />
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 mb-10 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((todo, index) => {
              return (
                <Todo
                  key={index}
                  id={index + 1}
                  title={todo.title}
                  description={todo.description}
                  complete={todo.isCompleted}
                  mongoId={todo._id}
                  deleteTodo={deleteTodo}
                  completeTodo={completeTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </>
  );
}
