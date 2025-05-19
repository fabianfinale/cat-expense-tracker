import {type FC, useEffect, useRef} from 'react';

interface DeleteConfirmationDialogProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmationDialog: FC<DeleteConfirmationDialogProps> = ({onConfirm, onCancel}) => {
    const cancelRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        cancelRef.current?.focus();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCancel();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onCancel]);

    return (
        <div className="dialog-overlay" role="dialog"
             aria-modal="true"
             aria-labelledby="deletion-modal-title">
            <div className="dialog dialog-s">
                <h2 id={"deletion-modal-title"}>Confirm Deletion</h2>
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
                    <button onClick={onCancel} ref={cancelRef}>Cancel</button>
                    <button
                        onClick={onConfirm}
                    >
                        Confirm Delete
                    </button>
                </div>
            </div>
        </div>

    );
}

export default DeleteConfirmationDialog;