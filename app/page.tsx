"use client";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import TodoComponent from "@/components/TodoComponent";
import { getTodoViaEndpoint, deleteTodo, createTodo } from "@/services/api";
import { showNotice } from "@/utils/showPopups";
import {
  useQuery,
  useQueryClient,
  InvalidateQueryFilters,
} from "@tanstack/react-query";
import React from "react";

export default function Home() {
  const [todo, setTodo] = React.useState("");
  const [endpoint, setEndpoint] = React.useState("http://127.0.0.1:8000/todo/");

  const queryClient = useQueryClient();
  const { data: todos, isLoading } = useQuery<any>({
    queryKey: ["todos"],
    queryFn: () => getTodoViaEndpoint(endpoint),
  });
  React.useEffect(() => {
    console.log(todos);
    queryClient.invalidateQueries("todos" as InvalidateQueryFilters);
    queryClient.refetchQueries("todos" as InvalidateQueryFilters);
  }, [endpoint, queryClient, todos]);
  const handleSubmit = async () => {
    if (!todo) {
      showNotice({
        title: "",
        text: "Please enter todo",
        icon: "error",
      });
      return;
    }
    const formData = {
      title: todo,
      completed: false,
      description: todo,
    };
    await createTodo(formData);
    setTodo("");
    queryClient.invalidateQueries("todos" as InvalidateQueryFilters);
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    showNotice({
      title: "Success",
      text: "Todo has been deleted",
      icon: "success",
    });
    queryClient.invalidateQueries("todos" as InvalidateQueryFilters);
  };

  if (isLoading) {
    return <Spinner />;
  }
  const { previous, next } = todos;

  return (
    <main className="flex justify-center items-center bg-gray-100 h-screen">
      <div className="md:w-1/3 h-fit bg-white shadow-sm rounded">
        <h1 className="text-3xl font-bold text-center my-3">Todo List</h1>
        <div className="px-5">
          <div className="flex items-center justify-between gap-1">
            <input
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              type="text"
              className="border border-gray-300 rounded w-full py-2 px-2"
            />
            <button
              onClick={handleSubmit}
              className="bg-indigo-500 hover:bg-indigo-600 w-40 text-white font-bold py-2 px-3 rounded"
            >
              Add Todo
            </button>
          </div>
          <TodoComponent todos={todos} handleDelete={handleDelete} />

          <Pagination
            previous={previous}
            next={next}
            setEndpoint={setEndpoint}
          />
        </div>
      </div>
    </main>
  );
}
