// axios library untuk melakukan data fetching
import axios from "axios";

import { Todos } from "types/todos.type";

export const getTodos = async (): Promise<Todos> => {
  try {
    // async function
    const res = await axios.get("http://localhost:8080/api/todos"); // axios untuk me-retrieve / invoke data fetching

    //jika proses await axios berhasil / fullfill
    return res.data;
  } catch (error) {
    throw new Error(error); //message untuk info error kenapa terjadi
  }
};
