import {type FC} from 'react';

interface DeleteConfirmationDialogProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmationDialog: FC<DeleteConfirmationDialogProps> = ({onConfirm, onCancel}) => (
    <div className="dialog-overlay">
        <div className="dialog dialog-s">
            <h2>Confirm Deletion</h2>
            <button
                className="dialog-close"
                onClick={onCancel}
                aria-label="Close"
                type="button"
            >
                &times;
            </button>
            <p>Are you sure you want to delete the selected expenses?</p>
            <div className="button-group" style={{justifyContent: 'center'}}>
                <button onClick={onCancel}>Cancel</button>
                <button
                    onClick={onConfirm}
                >
                    Confirm Delete
                </button>
            </div>
        </div>
    </div>

);

export default DeleteConfirmationDialog;