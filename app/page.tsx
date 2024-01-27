"use client";
import { getTodoViaEndpoint, deleteTodo, createTodo } from "@/services/api";
import {
  useQuery,
  QueryCache,
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
    console.log(endpoint);
    queryClient.invalidateQueries("todos" as InvalidateQueryFilters);
  }, [endpoint, queryClient]);
  const handleSubmit = async () => {
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
    queryClient.invalidateQueries("todos" as InvalidateQueryFilters);
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  const { previous, next } = todos;

  return (
    <main className="flex justify-center items-center bg-gray-200 h-screen">
      <div className="md:w-1/3 h-fit bg-white shadow-sm rounded">
        <h1 className="text-3xl font-bold text-center my-3">Todo List</h1>
        <div className="px-5">
          <div className="flex items-center justify-between gap-2">
            <input
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              type="text"
              className="border border-gray-300 rounded w-full py-2 px-3"
            />
            <button
              onClick={handleSubmit}
              className="bg-indigo-500 hover:bg-indigo-600 w-40 text-white font-bold py-2 px-3 rounded"
            >
              Add Todo
            </button>
          </div>
          <div className="my-4 space-y-3 shadow-sm">
            {todos?.results?.map((todo: any) => (
              <div
                key={todo.id}
                className="bg-gray-100 p-2 rounded flex items-center justify-between"
              >
                <p>{todo.title}</p>
                <p className="flex items-center gap-2">
                  <span
                    className="cursor-pointer"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-red-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 mb-4">
            {previous && (
              <div
                onClick={() => {
                  setEndpoint(previous);
                }}
                className="flex justify-start cursor-pointer"
              >
                <div className="flex items-center gap-1">
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                      />
                    </svg>
                  </p>
                  <p>Prev</p>
                </div>
              </div>
            )}
            {next && (
              <div
                onClick={() => {
                  setEndpoint(next);
                }}
                className="flex justify-end cursor-pointer"
              >
                <div className="flex items-center gap-1">
                  <p>Next</p>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
