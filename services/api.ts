import axios from "axios";

export const getTodoViaEndpoint = async (endpoint: any) => {
  const response = await axios.get(endpoint);
  return response.data;
};

export const createTodo = async (data: any) => {
  const response = await axios.post(`http://127.0.0.1:8000/todo/`, data);
  return response.data;
};

export const deleteTodo = async (id: any) => {
  const response = await axios.delete(`http://127.0.0.1:8000/todo/${id}/`);
  return response.data;
};
