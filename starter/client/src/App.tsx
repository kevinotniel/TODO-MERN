import React, { useState } from 'react'  

import Header from 'components/Header'
import TaskList from 'components/TaskList'
import Form from 'components/Form'
import PlusIcon from 'components/PlusButton/index'

const App: React.FC = () =>  { 
  const [showForm, setShowForm] = useState(false)
  // TODO:
  // !
  // ? 
  // *
  return (
    <main className="container relative bg-darkPurple mx-auto max-w-lg p-4 box-border min-h-screen">
      <Header />
      <TaskList />
      <Form inProp={showForm} onClose={() => setShowForm(false)} />
      <PlusIcon onClick={() => setShowForm(!showForm)} />
    </main>
  );
};

export default App
