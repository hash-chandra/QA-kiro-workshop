import { useState, useEffect, useCallback } from 'react';

let addToastFn = null;

export function showToast(message, type = 'success') {
  if (addToastFn) addToastFn({ message, type, id: Date.now() });
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    setToasts(prev => [...prev, toast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toast.id));
    }, 3000);
  }, []);

  useEffect(() => {
    addToastFn = addToast;
    return () => { addToastFn = null; };
  }, [addToast]);

  return (
    <div className="toast-container" data-testid="toast-container">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          data-testid="toast-message"
          role="alert"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
