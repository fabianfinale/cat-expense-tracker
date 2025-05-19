import {Fragment, useState} from 'react'
import type {Expense} from "./types.ts";
import AddExpenseDialog from "./components/AddExpenseDialog.tsx";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog.tsx";

function App() {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const [showExpenseDialog, setShowExpenseDialog] = useState(false);
    const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);

    const hasSelected = expenses.some(exp => exp.selected);

    return (
        <Fragment>
            <div>
                <h1>Cat Expense Tracker</h1>

                <div className="button-group">
                    <button onClick={() => setShowExpenseDialog(true)}>Add Expense</button>
                    <button disabled={!hasSelected} onClick={() => setShowDeleteConfirmationDialog(true)}>Delete
                        Selected
                    </button>
                </div>

                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenses.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{textAlign: 'center'}}>
                                No expenses yet
                            </td>
                        </tr>
                    ) : (
                        expenses.map((expense) => (
                            <tr key={expense.id} className={`clickable ${expense.selected} ? 'highlight' : ''`.trim()}>
                                <td><input
                                    type="checkbox"
                                    checked={expense.selected || false}
                                    onChange={() => {
                                        setExpenses(prev =>
                                            prev.map(e =>
                                                e.id === expense.id ? {...e, selected: !e.selected} : e
                                            )
                                        );
                                    }}
                                /></td>
                                <td>{expense.item}</td>
                                <td>{expense.category}</td>
                                <td>{expense.amount}$</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
            {showExpenseDialog && (
                <AddExpenseDialog
                    onClose={() => setShowExpenseDialog(false)}
                    onSubmit={(newExpense) => {
                        setExpenses(prev => [...prev, newExpense]);
                    }}
                />
            )}
            {showDeleteConfirmationDialog && (
                <DeleteConfirmationDialog
                    onCancel={() => setShowDeleteConfirmationDialog(false)}
                    onConfirm={() => {
                        setExpenses(prev => prev.filter(exp => !exp.selected));
                        setShowDeleteConfirmationDialog(false);
                    }}
                />
            )}
        </Fragment>
    )
}

export default App
