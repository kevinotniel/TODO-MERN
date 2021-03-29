import React from 'react'

import classnames from 'classnames'
import { Transition } from 'react-transition-group'

import CloseIcon from 'assets/svg/close'

type Props = {
  inProp : boolean,
  taskStatus : 'completed' | 'uncompleted',
  onDelete : () => void,
  onCancel : () => void
}

const DURATION = 300

//pertama-tama trasition ini tidak akan muncul karena display none, opacity 0, transition untuk efek transiti
const defaultStyle = {
  transition: `all ${DURATION}ms ease-in-out`,
  opacity: 0,
  display: 'none',
  left: '50%',
  top: '50%'
}

const transitionStyle = {
  unmounted: {opacity: 0, display: 'none'},
  entering: {opacity: 1, display: 'block'},
  entered: {opacity: 1, display: 'block'},
  exiting: {opacity: 0, display: 'none'},
  exited: {opacity: 0, display: 'none'},
}

const overlayDefaultStyle = {
  transition: `bottom ${DURATION}ms ease-in-out, opacity ${DURATION * 2}ms ease-in-out`,
  opacity: 0,
  display: 'none'
}

const overlayTransitionStyles = {
  unmounted: { bottom: '-180px', opacity: 0 },
  entering: { display: 'block', opacity: .85 },
  entered: { display: 'block', opacity: .85 },
  exiting: { bottom: '-180px', opacity: 0 },
  exited: { bottom: '-180px', opacity: 0 }
}

const DeleteModal: React.FC<Props> = ({ inProp, onDelete, onCancel, taskStatus }) => {

  const buttonStyle = classnames('text-white text-sm tracking-wide font-bold px-4 py-2 rounded-lg', {
    'bg-red-600': taskStatus === 'uncompleted',
    'bg-green-400': taskStatus === 'completed'
  })

  return(
    
    <Transition in={inProp} timeout={DURATION}>
      {(state) => (
        <>
          {/* overlay yang harus ada di dalam react fragment <></> */}
          <div
            onClick={onCancel}
            style={{
              ...overlayDefaultStyle,
              ...overlayTransitionStyles[state]
            }}
            className="fixed z-10 left-0 top-0 bottom-0 right-0 bg-black"
          />
          <div 
            style={{
              ...defaultStyle,
              ...transitionStyle[state]
            }}
            className="bg-white p-4 h-40 w-64 rounded-lg fixed z-10 transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
          >
          <div className="flex flex-col h-full justify-between">
            <section className="flex flex-row justify-between">
              <p className="text-darkPurple text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal ">
                {/* jika task status uncompleted atau complete akan mereturn ini */}
                {taskStatus === 'uncompleted' && 'This task is not completed, delete?'}
                {taskStatus === 'completed' && 'Congrat on completing the task'}

                {/* jika uncompleted atau completed akan mereturn emoji yg berbeda */}
                {taskStatus === 'completed' && (
                  <p className="text-2xl">
                  &#128540;
                  </p>
                )}
                {taskStatus === 'uncompleted' && (
                  <p className="text-2xl">
                    &#128548;
                  </p>
                )}
              </p>

              <CloseIcon onClick={onCancel} />

            </section>
            <button 
              onClick={onDelete}
              className={buttonStyle}>
              {taskStatus === 'completed' ? 'Delete completed task' : 'Delete uncompleted task'}
            </button>
          </div> 
          </div>
        </>
      )}
    </Transition>

    
  )
}

export default DeleteModal