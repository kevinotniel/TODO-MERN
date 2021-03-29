import React, { useState } from 'react'

import classnames from 'classnames'
import { useMutation, useQueryCache } from 'react-query'
// usemutation untuk merubah data tetapi tidak meminta data
// useQueryCache cara untuk mengakses cache sehingga dapat invalidate setelah selesai mengupdate todo
import { updateTodo } from 'api/updateTodo'
import { deleteTodo } from 'api/deleteTodo'

import ChecklistIcon from 'assets/svg/checklist'
import TrashIcon from 'assets/svg/trash'
import DeleteModal from 'components/DeleteModal'
import ClockIcon from 'assets/svg/clock'

type Props = {
  taskId: string,
  title: string,
  status: 'completed' | 'uncompleted'
}
// taskId untuk identifier saat ingin meng-update sebuah todo
// status sebagai flex atau sebagai state dapat merubah style berdasarkan status todo 
 

const TaskCard: React.FC<Props> = ({ title, taskId, status }) => {

  const cache = useQueryCache()

  const [showDeleteModal, setShowDeleteModal] = useState(false) //yang akan memunculkan modal

  const [checkTodo, { isLoading }] = useMutation(updateTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos')
      // jika proses updateTodo success, cache.invalidateQueries('todos) akan memperbarui data pada cache untuk menerima data ter-update dari server
    }
  })

  const [removeTodo] = useMutation(deleteTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos')
    }
  })

  const handleRemoveTodo = (type: 'delete' | 'cancel') => {
    if(type === 'delete') {
      removeTodo(taskId)
      setShowDeleteModal(false)
    } 

    if(type === 'cancel') {
      setShowDeleteModal(false)
    }
  }

  // background white dihapus karena akan menjajdi sebuah bg yg dinamic
  const containerClass = classnames('flex justify-center items-center relative rounded shadow-lg p-4 mb-2 ', {
    'bg-white text-darkPurple': status === 'uncompleted',
    'bg-gray-300 bg-opacity-50': status === 'completed'
  })

  const titleClass = classnames('flex-1 text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal truncate', {
    'line-through': status === 'completed'
  })

  const checkListClass = classnames('w-5 ml-4', {
    'text-green-400': status === 'completed',
    'text-green-600': status === 'uncompleted'
  })

  return(
    <div className={containerClass}>
      {/*flex-1 artinya memiliki full-width mengambil persentace dari space yang ada */}
      {/* seterusnya adalah typography, truncate artinya jika melebihi batas lebar dia akan diberi pemotongan */}
      <p className={titleClass}>
        { title }
      </p>

      <div className="flex text-darkPurple">
        <span>
          {/* jika isLoading true maka dijalankan jika false checkListICon di jalankan */}
          {isLoading ? (
            <ClockIcon />
          ) : (
            <ChecklistIcon className={checkListClass} onClick={() => checkTodo(taskId)} />
            )}
        </span>
        <span className="w-5 h-5  ml-4 text-red-600">
          <TrashIcon onClick={() => setShowDeleteModal(true)} />
          {/* validate membuat delete modal muncul  */}
        </span>
      </div>

      <DeleteModal 
        inProp={showDeleteModal} //apakah true atau false
        taskStatus={status}
        //saat delete modal apakah delete atau cancel
        onDelete={() => handleRemoveTodo('delete')} 
        onCancel={() => handleRemoveTodo('cancel')}
        />
    </div>
  )
}

export default TaskCard