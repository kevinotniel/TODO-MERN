import axios, { AxiosResponse } from "axios";

import { getTodoResult } from "types/todos.type";

export const getTodo = async (
  id: string
): Promise<AxiosResponse<getTodoResult>> => {
  try {
    const res = await axios({
      // cara yang berbeda tetapi hasil yang sama
      method: "GET",
      url: `http://localhost:8080/api/todos/${id}`,
    });

    return res;
  } catch (error) {
    throw new Error(error);
  }
};
