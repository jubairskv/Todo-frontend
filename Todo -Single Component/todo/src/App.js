
import { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const App = () => {
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  
  //console.log(input);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!edit) {
      setTodo([...todo, { id: uuidv4(), title: input}]);
      setInput("");
    } else {
      updateTodo(input, edit.id);
    }
  };
  //console.log(todo);
  
  const updateTodo = (title, id) => {
    const newTodo = todo.map((todo) =>
      todo.id === id ? { title, id } : todo
    );
    setTodo(newTodo);
    setEdit('');
  };


  const handleDelete = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setEdit(item);
  };

  
  useEffect(() => {
    if (edit) {
      setInput(edit.title);
    } else {
      setInput("");
    }
  }, [setInput, edit]);

  return (
    <div>
      <h1>Todo-list</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleInput} />
        <button type="submit">{edit ? 'Edit' : 'Submit'}</button>
      </form>
      <div>
        {todo.map((item) => (
          <li key={item.id} className="todo-container">
            <h5 className="todo">{item.title}</h5>
            <FaEdit onClick={() => handleEdit(item)} />
            <MdDelete onClick={() => handleDelete(item.id)} />
          </li>
        ))}
      </div>
    </div>
  );
};

export default App;
