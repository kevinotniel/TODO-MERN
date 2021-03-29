import { Request, Response } from 'express';

import TodoModel from '../../models/todo';
import { Todo } from '../../types/todo';

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  //sebuah database schema atau pola sebuah spesifikasi permintaan request dari user
  //variable todos akan diisi data array of object dengan type Todo
  //.find() method mongoose method mongoose yang akan mencarikan data dari database untuk kita saat selesai akan dijalankan
  const todos: Todo[] = await TodoModel.find();

  res.status(200).json({ todos });
};

export const getTodo = async (req: Request, res: Response): Promise<void> => {
  await TodoModel.findById(req.params.id, (err, result) => {
    // operasional mongoose method findById
    // arameter 2 adalah callback function
    //id disini yg menghold id yang di url api, dan membuat kondisional jika error dan berhasil(result)
    if (err) {
      res.status(400).json({
        error: err //massage error
      });
    } else {
      res.status(200).json({
        result
      });
    }
  });
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  // memvalidasi apakah user telah submit body yang tepat pada requestnya dari modul Todo
  const body: Pick<Todo, 'title' | 'status'> = req.body;

  // memvalidasi
  if (!body.title || !body.status) {
    //jika body title dan status tidak ada, atau salah satu tidak ada
    res.status(401).json({
      // 401 unautorize dan bad request
      status: 401,
      errorMessage: `ValidationError: Todo validation failed: title: ${body.title}, status: ${body.status}`
    });
    // setelah if dijalankan atau ada yang tidak ada maka akan berhenti disini code dibawahnya tidak dijalankan
    return;
  }

  // ingin memasukan data baru ke database harus menggunakan monggose
  const newTodoModel = new TodoModel({
    // anggap saja TodoModel formulir data-data
    title: body.title,
    status: body.status
  });

  // formulir yang dibuat disave kedalam database
  const newTodo = await newTodoModel.save();

  const updatedAllTodosAfterSave = await TodoModel.find();

  res.status(201).json({
    //201 = sukses namun lebih detail
    message: 'Todo successfullt added!',
    addedTodo: newTodo,
    allTodosAfterAddition: updatedAllTodosAfterSave
  });
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    params: { id },
    body
  } = req;

  // validasi error
  if (!body.title || !body.status || !id) {
    res.status(401).json({
      status: 401, // 401 unautorize dan bad request
      errorMessage: `ValidationError: _id or requred body properties is no defined`
    });
    //block scope if jika valid tidak error
    return;
  }
  // valid
  // method mongoose findByIdandUpdate
  // parameter 1 id yang digenerate dari todo model menggunakan _id, dan id adalah id yang dipassing dari url route
  // parameter 2 body hal apa yang ingin dicantumkan kedalam formulir yang ada di database dengan value terupdate
  const updatedTodo = await TodoModel.findByIdAndUpdate({ _id: id }, body);
  const updatedAllTodosAfterUpdate = await TodoModel.find();

  // jika proses update findbyIdand update gagal
  if (!updatedTodo) {
    res.status(501).json({
      status: 501,
      errorMessage: 'Edit todo faile, Not implemented'
    });
    return;
  }

  //jika proses updatedTodo berhasil
  res.status(200).json({
    message: 'Todo successfully edited',
    updatedTodo,
    todos: updatedAllTodosAfterUpdate
  });
};

export const removeTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  // mendestructured dari req objek
  const {
    params: { id }
  } = req;

  //validasi error
  if (!id) {
    res.status(401).json({
      status: 401,
      errorMessage: `ValidationError: Params _id is not defined`
    });
    return;
  }

  const removedTodo = await TodoModel.findByIdAndRemove(id);
  const updatedAllTodosAfterRemove = await TodoModel.find();

  // validasi operasi gagal atau null
  if (!removedTodo) {
    res.status(501).json({
      status: 501,
      errorMessage: `Remove todo failed.not Implemented`
    });

    return;
  }

  res.status(200).json({
    message: 'Todo Successfully removed',
    removedTodo,
    todos: updatedAllTodosAfterRemove
  });
};
