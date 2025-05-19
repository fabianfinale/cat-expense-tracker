import {type FC, type FormEvent, useState} from 'react';
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!item || !amount || !category) return;

        onSubmit({
            id: crypto.randomUUID(),
            item,
            category,
            amount: parseFloat(amount),
        });
        onClose();
    }

    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <h2>Add Expense</h2>
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
                            />
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