import React from 'react'
import { useQuery } from 'react-query'

import { getTodos } from 'api/getTodos'

import TaskCard from 'components/TaskCard'

const TaskList: React.FC = () => {

  const { isLoading, isError, error, data } = useQuery('todos', getTodos)

  // data prosessing

  // konditional statement jika loading true maka section akan belum dirender 
  if (isLoading) {
    return(
      <div>Is Loading. . .</div>
    )
  }

  // jika useQuery terjadi sebuah error
  if (isError) {
    return(
      <div>Is Error. . .{error}</div> //error handling ui / error message
    )
  }

  // jika kedua di atas sudah dilewati maka kikta gunakan maping
  return( 
    <section className="flex flex-col overflow-x-hidden overflow-y-auto h-taskList rounded">
      {/* jika data ? (tidak undifined) baru kita dapat melakukan maping  */}
      {data?.todos.map((todo) => {
        return(
          // mengambil apa yang ada di parameter callback todo
          <TaskCard 
            key={todo._id} 
            title={todo.title} 
            taskId={todo._id}
            status={todo.status}
          />  
        )
      })}
    </section>
  )
}
export default TaskList
// sebuah wadah/container untuk menampung task card 
// jika memiliki banyak task card, komponen tasklist akan membuat overflow atau membuat behavior scroll jika melebihi dari batas height(vh)