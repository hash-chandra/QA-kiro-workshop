import { useState, useEffect, useRef } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/client';
import TaskForm from '../components/TaskForm';
import ConfirmDialog from '../components/ConfirmDialog';
import EditTaskModal from '../components/EditTaskModal';
import { showToast } from '../components/Toast';

export default function DashboardPage({ user }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  // Sequence number of the most recent task request, used to discard responses
  // that have been superseded.
  const latestRequestRef = useRef(0);

  async function loadTasks() {
    const requestId = ++latestRequestRef.current;
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (statusFilter) params.status = statusFilter;
    const data = await getTasks(params);
    // Drop a response that a newer request has already superseded. Nothing
    // guarantees these resolve in order: the unfiltered request fired on mount
    // could land after a filtered one and repopulate the list with every task,
    // leaving the UI permanently inconsistent with the selected filter. That is
    // rare locally but reproducible over a slower connection.
    if (requestId !== latestRequestRef.current) return;
    setTasks(data);
    setLoading(false);
  }

  useEffect(() => { loadTasks(); }, [search, statusFilter]);

  async function handleCreate(data) {
    await createTask(data);
    setShowForm(false);
    showToast('Task created successfully');
    loadTasks();
  }

  function confirmDelete(task) {
    setDeleteTarget(task);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    await deleteTask(deleteTarget.id);
    setDeleteTarget(null);
    showToast('Task deleted successfully');
    loadTasks();
  }

  async function handleEdit(data) {
    if (!editTarget) return;
    await updateTask(editTarget.id, data);
    setEditTarget(null);
    showToast('Task updated successfully');
    loadTasks();
  }

  return (
    <div className="page" data-testid="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <span data-testid="welcome-message">Welcome, {user?.name}</span>
      </div>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          data-testid="search-input"
          aria-label="Search tasks"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          data-testid="status-filter"
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button onClick={() => setShowForm(!showForm)} data-testid="add-task-button">
          {showForm ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      {showForm && <TaskForm onSubmit={handleCreate} />}

      {loading ? (
        <p data-testid="loading-indicator">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p data-testid="no-tasks-message">No tasks found</p>
      ) : (
        <table data-testid="task-table" aria-label="Tasks">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Assignee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} data-testid={`task-row-${task.id}`}>
                <td>{task.id}</td>
                <td data-testid="task-title">{task.title}</td>
                <td><span className={`badge badge-${task.status}`} data-testid="task-status">{task.status}</span></td>
                <td>{task.assignee}</td>
                <td>
                  <button
                    className="btn-edit btn-sm"
                    onClick={() => setEditTarget(task)}
                    data-testid={`edit-task-${task.id}`}
                    aria-label={`Edit task: ${task.title}`}
                  >
                    Edit
                  </button>{' '}
                  <button
                    className="btn-danger btn-sm"
                    onClick={() => confirmDelete(task)}
                    data-testid={`delete-task-${task.id}`}
                    aria-label={`Delete task: ${task.title}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && <p data-testid="task-count">{tasks.length} task(s)</p>}

      {deleteTarget && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${deleteTarget.title}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {editTarget && (
        <EditTaskModal
          task={editTarget}
          onSave={handleEdit}
          onCancel={() => setEditTarget(null)}
        />
      )}
    </div>
  );
}
