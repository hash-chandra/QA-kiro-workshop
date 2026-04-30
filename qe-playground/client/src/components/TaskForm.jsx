import { useState } from 'react';

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');
  const [assignee, setAssignee] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    onSubmit({ title, status, assignee });
    setTitle('');
    setAssignee('');
  }

  return (
    <form onSubmit={handleSubmit} className="card" data-testid="task-form">
      <h3>New Task</h3>
      {error && <div className="error-message" data-testid="task-form-error">{error}</div>}

      <label htmlFor="task-title">Title</label>
      <input
        id="task-title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task title"
        data-testid="task-title-input"
      />

      <label htmlFor="task-status">Status</label>
      <select id="task-status" value={status} onChange={e => setStatus(e.target.value)} data-testid="task-status-select">
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <label htmlFor="task-assignee">Assignee</label>
      <input
        id="task-assignee"
        value={assignee}
        onChange={e => setAssignee(e.target.value)}
        placeholder="Assignee email"
        data-testid="task-assignee-input"
      />

      <button type="submit" data-testid="submit-task-button">Create Task</button>
    </form>
  );
}
