import { useReducer, useRef } from 'react';
import { addJob, deleteJob, setJob } from './action';
import logger from './logger';
import reducer, { initState } from './reducer';

function TodoApp() {
  const [state, dispatch] = useReducer(logger(reducer), initState);
  const { job, jobs } = state;
  const inputRef = useRef();
  const handleSubmit = () => {
    dispatch(addJob(job));
    dispatch(setJob(''));
    inputRef.current.focus();
  };
  return (
    <div style={{ padding: '0 30px' }}>
      <h3>Todo</h3>
      <input
        ref={inputRef}
        value={job}
        placeholder='Enter todo....'
        onChange={(e) => {
          dispatch(setJob(e.target.value));
        }}
      />
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            {job}
            <button onClick={() => dispatch(deleteJob(index))}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
