import { useState, useEffect } from 'react';
import { getTasks, createTask, deleteTask } from '../api/client';
import TaskForm from '../components/TaskForm';

export default function DashboardPage({ user }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadTasks() {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (statusFilter) params.status = statusFilter;
    const data = await getTasks(params);
    setTasks(data);
    setLoading(false);
  }

  useEffect(() => { loadTasks(); }, [search, statusFilter]);

  async function handleCreate(data) {
    await createTask(data);
    setShowForm(false);
    loadTasks();
  }

  async function handleDelete(id) {
    await deleteTask(id);
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
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          data-testid="status-filter"
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
        <table data-testid="task-table">
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
                    className="btn-danger btn-sm"
                    onClick={() => handleDelete(task.id)}
                    data-testid={`delete-task-${task.id}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p data-testid="task-count">{tasks.length} task(s)</p>
    </div>
  );
}
