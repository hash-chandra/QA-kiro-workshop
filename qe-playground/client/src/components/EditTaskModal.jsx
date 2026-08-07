import { useState } from 'react';

export default function EditTaskModal({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [assignee, setAssignee] = useState(task.assignee || '');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    onSave({ title, status, assignee });
  }

  return (
    <div className="modal-overlay" data-testid="edit-task-modal">
      <form className="modal" onSubmit={handleSubmit} role="dialog" aria-labelledby="edit-modal-title">
        <h3 id="edit-modal-title">Edit Task</h3>

        {error && <div className="error-message" data-testid="edit-task-error">{error}</div>}

        <label htmlFor="edit-title">Title</label>
        <input
          id="edit-title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          data-testid="edit-title-input"
        />

        <label htmlFor="edit-status">Status</label>
        <select
          id="edit-status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          data-testid="edit-status-select"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <label htmlFor="edit-assignee">Assignee</label>
        <input
          id="edit-assignee"
          value={assignee}
          onChange={e => setAssignee(e.target.value)}
          data-testid="edit-assignee-input"
        />

        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={onCancel} data-testid="edit-cancel-button">
            Cancel
          </button>
          <button type="submit" className="btn-save" data-testid="edit-save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
