import { useReducer, useRef, useState } from 'react';
import './App.css';
import TodoItems from './To-do-item';

export const ACTION_TYPE = {
  ADD_POST: 'add-post',
  TOGGLE: 'toggle',
};

function App() {
  const [posts, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('');
  const inputRef = useRef();

  function reducer(posts, action) {
    switch (action.type) {
      case ACTION_TYPE.ADD_POST:
        return [...posts, { id: Date.now(), name: action.payload.name, toggle: true }];

      case ACTION_TYPE.TOGGLE:
        return posts.map(post =>
          post.id === action.payload.id ? { ...post, toggle: !post.toggle } : post
        );
      default:
        return posts;
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTION_TYPE.ADD_POST, payload: { name } });
    setName('');
  }
  function focus() {
    inputRef.current.focus();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </form>
      {posts.map((post) => (
        <TodoItems key={post.id} post={post} dispatch={dispatch} />
      ))}
      <button onClick={focus}>Get back writing</button>
    </div>
  );
}

export default App;