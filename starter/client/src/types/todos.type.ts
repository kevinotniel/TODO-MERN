export interface Todos {
  todos: Todo[]; //object property array of objet dari interface Todo dibawah
}

// data-data tersebut adalah sebuah object yang direturn dari database mongo
interface Todo {
  _id: string;
  title: string; // hanya akan menggunakan data yang kita proses ke frontend
  status: "completed" | "uncompleted"; // hanya akan menggunakan data yang kita proses ke frontend
  createdAt: string; // object dari mongo dari timestamp
  updatedAt: string; // object dari mongo dari timestamp
  __v: number;
}

export interface getTodoResult {
  result: Todo;
}

export interface TodoBody {
  title: string;
  status?: "completed" | "uncompleted";
}
