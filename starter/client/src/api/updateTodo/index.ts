import axios from "axios";

import { getTodo } from "api/getTodo"; //kita akan meminjam supaya tidak melakukan redudant logic(reuseable)

import { TodoBody } from "types/todos.type"; // reusable
import { TodoStatus } from "enums/todos.enum"; // untuk menyimpan enum

export const updateTodo = async (id: string): Promise<void> => {
  try {
    // meminjam service getTodo untuk mengisi getTodoRes
    const getTodoRes = await getTodo(id);

    // kondisional jika proses getTodos success
    if (getTodoRes.status === 200) {
      // pertama kita harus menyimpan hasil todo/ data todo yang ingin kita ambil ke dalam cont todo
      // dalam getTodo memiliki type akan memiliki paramater result untuk keynya agar mendapatkan Todo object
      const todo = getTodoRes.data.result;

      // meng-construct body yang nantinya akan kita kirim ke api updateTodo
      const body: TodoBody = {
        // title disini kita tidak melakukan perubahan
        title: todo.title,
      };

      // yang ingin kita rubah completed dan uncompleted
      // lakukan perbandingan
      todo.status === TodoStatus.completed //jika ia completed maka kita buat dia menjadi uncompleted
        ? (body.status = "uncompleted")
        : (body.status = "completed");

      // trigger axios method
      await axios({
        method: "PUT",
        url: `http://localhost:8080/api/update-todo/${id}`,
        data: body, //data apa yang ada di dalam const body di atas
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};
