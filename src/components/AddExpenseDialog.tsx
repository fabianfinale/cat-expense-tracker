import {type FC, type FormEvent, useEffect, useRef, useState} from 'react';
import type {Category, Expense} from "../types.ts";
import CatFact from "./CatFact.tsx";

interface AddExpenseDialogProps {
    onClose: () => void;
    onSubmit: (expense: Expense) => void;
}

const AddExpenseDialog: FC<AddExpenseDialogProps> = ({onClose, onSubmit}) => {


    const [item, setItem] = useState('');
    const [category, setCategory] = useState<Category>("Food");
    const [amount, setAmount] = useState("");
    const [errors, setErrors] = useState<{ item?: string; amount?: string }>({});

    const itemRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        itemRef.current?.focus();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const trimmedItem = item.trim();
        const sanitizedItem = trimmedItem.replace(/[^a-zA-Z0-9\s.,'-]/g, '');
        const parsedAmount = parseFloat(amount);
        const newErrors: typeof errors = {};

        if (!sanitizedItem) {
            newErrors.item = 'Item name is required.';
        } else if (sanitizedItem.length > 50) {
            newErrors.item = 'Item name must be 50 characters or fewer.';
        }

        if (!amount) {
            newErrors.amount = 'Amount is required.';
        } else if (isNaN(parsedAmount) || parsedAmount <= 0) {
            newErrors.amount = 'Amount must be greater than zero.';
        } else if (parsedAmount > 10000) {
            newErrors.amount = 'That’s a bit too expensive.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        onSubmit({
            id: crypto.randomUUID(),
            item: sanitizedItem,
            category,
            amount: parsedAmount,
        });
        onClose();
    }

    return (
        <div className="dialog-overlay" role="dialog"
             aria-modal="true"
             aria-labelledby="modal-title">
            <div className="dialog">
                <h2 id={"modal-title"}>Add Expense</h2>
                <button
                    className="dialog-close"
                    onClick={onClose}
                    aria-label="Close"
                    type="button"
                >
                    &times;
                </button>
                <div className="dialog-container">
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-row">
                            <label htmlFor="item">Item:</label>
                            <input
                                id="item"
                                type="text"
                                value={item}
                                onChange={(e) => setItem(e.target.value)}
                                required
                                ref={itemRef}
                            />
                        </div>
                        <div className="form-error-container">
                            {errors.item && <p className="form-error">{errors.item}</p>}
                        </div>

                        <div className="form-row">
                            <label htmlFor="category">Category:</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as Category)}
                                required
                            >
                                <option value="Food">Food</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Accessory">Accessory</option>
                            </select>
                        </div>
                        <div className="form-error-container">
                        </div>

                        <div className="form-row">
                            <label htmlFor="amount">Amount:</label>
                            <input
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                min="0.01"
                                step="0.01"
                            />
                        </div>
                        <div className="form-error-container">
                            {errors.amount && <p className="form-error">{errors.amount}</p>}
                        </div>

                        <div className="form-actions">
                            <button type="submit">Submit</button>
                        </div>
                    </form>

                    <CatFact/>
                </div>
            </div>
        </div>
    );
}

export default AddExpenseDialog;