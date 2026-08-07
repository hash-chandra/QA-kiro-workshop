export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="dialog-overlay" data-testid="confirm-dialog">
      <div className="dialog" role="alertdialog" aria-labelledby="dialog-title" aria-describedby="dialog-message">
        <h3 id="dialog-title">Confirm Action</h3>
        <p id="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button className="btn-cancel" onClick={onCancel} data-testid="confirm-cancel-button">
            Cancel
          </button>
          <button className="btn-confirm" onClick={onConfirm} data-testid="confirm-ok-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
