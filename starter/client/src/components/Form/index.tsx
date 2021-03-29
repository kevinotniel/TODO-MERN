import React from 'react'
import { Transition } from 'react-transition-group'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryCache } from 'react-query'

import { postTodo } from 'api/postTodo'

import CloseIcon from 'assets/svg/close'

type Props = {
  inProp: boolean,
  onClose: () => void
}

type Inputs = {
  title: string,
  status: 'completed' | 'uncompleted'
}

const DURATION = 240

// muncul dari bawah ke atas
const formDefaultStyle = {
  transition: `bottom ${DURATION}ms ease-in-out, opacity ${DURATION * 2}ms ease-in-out`,
  opacity: 0,
  bottom: '-180px'
}

// unmounted, exited dan exiting akan mengembalikan dari atas ke bawah
// entering dan entered akan menempel di bawah
const formTransitionStyles = {
  unmounted: { bottom: '-180px', opacity: 0},
  entering: { bottom: 0, opacity: 1},
  entered: { bottom: 0, opacity: 1},
  exiting: { bottom: '-180px', opacity: 0},
  exited: { bottom: '-180px', opacity: 0}
}

const overlayDefaultStyle = {
transition: `bottom ${DURATION}ms ease-in-out, opacity ${DURATION * 2}ms ease-in-out`,
opacity: 0,
display: 'none'
}

const overlayTransitionStyles = {
  unmounted: { bottom: '-180px', opacity: 0},
  entering: { display: 'block', opacity: .85},
  entered: { display: 'block', opacity: .85},
  exiting: { bottom: '-180px', opacity: 0},
  exited: { bottom: '-180px', opacity: 0}
}

const Form: React.FC<Props> = ({ inProp, onClose }) => {
  
  const { register, handleSubmit, errors, reset } = useForm<Inputs>()
  
  const cache = useQueryCache()

  // mutate ini akan mempasing ke postTodo service api
  const [mutate] = useMutation(postTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos')
    }
  })

  // postTodo service meminta kita mempasing data dengan type TodoBody berisi title dan status, sehingga type Inputs berisi title dan status sehingga bisa kita masukan kedalam mutate
  const onSubmit = async (data: Inputs): Promise<void> => {
    try {

      await mutate(data)
      // saat todo di passing ke dalam api server input dibersihkan
      reset()

    } catch (error) {
      throw new Error(error)
    }
  }


  const handleOnClose = () => {
    reset()
    onClose()
  }

  const placeholderStyle = classnames(
    'text-darkPurple flex-1 bg-transparent outline-none',{
      'placeholder-red-400': errors.title
    }
  )

  const inputStyle = classnames('flex justify-center items-center bg-gray-200 px-4 py-2 rounded-lg box-border', {
    'bg-red-200': errors.title
  })

  return(
    <Transition in={inProp} timeout={DURATION}>
      {(state) => (
        <>
          {/* overlay bg */}
          <div
            onClick={onClose}
            style={{
              ...overlayDefaultStyle,
              ...overlayTransitionStyles[state]
            }}
            className="fixed left-0 top-0 bottom-0 right-0 bg-black"
          />

          <div 
            style={{
              ...formDefaultStyle,
              ...formTransitionStyles[state]
            }}
            className="fixed flex flex-col z-10 inset-x-0 rounded-t-lg p-4 h-32 bg-white">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={inputStyle}> 
              <input 
                  // input title dari register untuk form todo yang akan dimasukan kedalam server
                ref={register({
                  // required artinya harus terisi karena value true
                  required: {
                    value: true,
                    message: 'this field is required'
                  },
                  minLength: {
                    value: 8,
                    message: 'Minimum characters is 8!'
                  },
                  maxLength: {
                    value: 30,
                    message: 'No more than 30 characters!'
                  }
                })}
                name="title" 
                placeholder={errors.title ? '...Oops!' : 'belajar lagi'} 
                className={placeholderStyle}
              />

              <input 
                // tidak diberikan params karena untuk input status ini defaultValue uncompleted
                ref={register}
                name="status" 
                defaultValue="uncompleted"
                className="hidden"
              />

              {/* UI ENCHANCEMENT FORM */}
              {errors.title ? (
                <button
                // untuk melakukan reset
                  onClick={() => reset()}
                  className="bg-transparent text-md font-bold text-darkPurple outline-none ml-1"
                >
                  Reset
                </button>
              ) : (
                // jika tidak error
                <input
                  type="submit"
                  value="Add"
                  className="bg-transparent outline-none text-md font-bold text-darkPurple ml-1"
                /> 
              )}
            </form>
            {/* jika title error maka akan mengeluarkan text span */}
            {errors.title && (
              <span className="text-xl text-red-500 font-semibold tracking wide mt-2 pl-1">{errors?.title?.message}</span>
            )}

            <span 
              onClick={handleOnClose}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                bottom: '10px',
                left: '50%'
              }}
            >
              <CloseIcon />
            </span> 
          </div>
        </> 
      )}
    </Transition>
    
  )
}

export default Form