import { useNavigate } from 'react-router-dom';
import { logout } from '../api/client';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    onLogout();
    navigate('/');
  }

  if (!user) return null;

  return (
    <nav className="navbar" data-testid="navbar">
      <span className="navbar-brand">QE Playground</span>
      <div>
        <span data-testid="navbar-user">{user.email}</span>
        <button onClick={handleLogout} data-testid="logout-button">Logout</button>
      </div>
    </nav>
  );
}
